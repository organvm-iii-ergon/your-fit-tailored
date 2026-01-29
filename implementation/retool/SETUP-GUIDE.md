# Retool Setup Guide: State Authority Subsystem

## Prerequisites

- Retool account (free tier works for pilot)
- Airtable base `YFT-StateAuthority` created and populated
- Airtable API key or Personal Access Token

## Initial Setup

### Connect Airtable as Resource

1. Go to Retool → Resources → Create New
2. Select "Airtable"
3. Name: `YFT-Airtable`
4. Enter your Airtable API key or Personal Access Token
5. Test connection
6. Save

### Create App: YFT-WarehouseOps (T022)

1. Create new app: `YFT-WarehouseOps`
2. Set as "Web" app type (Mobile version created separately)

---

## Phase 3: Garment Scanner (T023-T025)

### Create Page: GarmentScanner

#### Layout

```
┌─────────────────────────────────────────────────────────┐
│  YFT Warehouse Ops - Garment Scanner                    │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐            │
│  │  Barcode: [________________] [Scan]     │            │
│  └─────────────────────────────────────────┘            │
│                                                         │
│  ┌─────────────────────────────────────────┐            │
│  │  Garment Details                         │            │
│  │  ─────────────────────────────────────── │            │
│  │  ID:         G001                        │            │
│  │  SKU:        TOP-CREW-BLK               │            │
│  │  Size:       M                          │            │
│  │  State:      [Available] ●              │            │
│  │  Condition:  A                          │            │
│  │  Wear Count: 5 / 50                     │            │
│  │  Cycle:      (none)                     │            │
│  │  Box:        (none)                     │            │
│  └─────────────────────────────────────────┘            │
│                                                         │
│  ┌─────────────────────────────────────────┐            │
│  │  Available Actions                       │            │
│  │  ─────────────────────────────────────── │            │
│  │  [Reserve]  [Send to Refurbish]         │            │
│  │  [Quarantine]  [Retire]                 │            │
│  └─────────────────────────────────────────┘            │
│                                                         │
│  ┌─────────────────────────────────────────┐            │
│  │  Recent Events (this garment)           │            │
│  │  ─────────────────────────────────────── │            │
│  │  2024-01-15  Available → Reserved       │            │
│  │  2024-01-10  Refurbish → Available      │            │
│  └─────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

#### Queries

**Query: getGarmentByBarcode**
```javascript
// Resource: YFT-Airtable
// Action: List Records
// Table: Garments
// Filter: {barcode} = '{{barcodeInput.value}}'
```

**Query: getValidTransitions**
```javascript
// Resource: YFT-Airtable
// Action: List Records
// Table: TransitionRules
// Filter: AND(
//   {entity_type} = 'Garment',
//   {from_state} = '{{currentGarment.asset_state}}',
//   {is_active} = TRUE()
// )
```

**Query: getGarmentEvents**
```javascript
// Resource: YFT-Airtable
// Action: List Records
// Table: Events
// Filter: AND(
//   {entity_type} = 'Garment',
//   {entity_id} = {{currentGarment.garment_id}}
// )
// Sort: timestamp DESC
// Limit: 10
```

**Query: updateGarmentState**
```javascript
// Resource: YFT-Airtable
// Action: Update Record
// Table: Garments
// Record ID: {{currentGarment.id}}
// Fields: {
//   "asset_state": "{{selectedTransition.to_state}}"
// }
```

#### Components

1. **barcodeInput** (Text Input)
   - Placeholder: "Scan or enter barcode"
   - On submit: Run `getGarmentByBarcode`

2. **garmentDetails** (Container with Text components)
   - Bind to `getGarmentByBarcode.data[0]`

3. **stateIndicator** (Badge/Tag)
   - Value: `{{getGarmentByBarcode.data[0]?.asset_state}}`
   - Color: Map states to colors (Available=green, Reserved=yellow, etc.)

4. **lifecycleProgress** (Progress Bar)
   - Value: `{{getGarmentByBarcode.data[0]?.wear_count}}`
   - Max: `{{getGarmentByBarcode.data[0]?.max_wear_limit}}`

5. **actionButtons** (Button Group)
   - Dynamically show based on `getValidTransitions.data`
   - Each button runs `updateGarmentState` with selected to_state

6. **eventsTable** (Table)
   - Data: `getGarmentEvents.data`
   - Columns: timestamp, from_state, to_state, actor_id

#### Error Handling (T025)

Add error display component:

```javascript
// After updateGarmentState, check for errors
if (updateGarmentState.error) {
  // Look up error code
  const errorCode = updateGarmentState.error.code || 'E003';
  const errorInfo = getErrorCodes.data.find(e => e.error_code === errorCode);

  showNotification({
    type: 'error',
    title: errorInfo?.error_name || 'Error',
    message: errorInfo?.error_message || 'An error occurred',
    description: errorInfo?.resolution_hint
  });
}
```

---

## Phase 4: Cycle Manager (T028-T032)

### Create App: YFT-AdminConsole

1. Create new app: `YFT-AdminConsole`

### Create Page: CycleManager

#### Layout

```
┌─────────────────────────────────────────────────────────┐
│  YFT Admin - Cycle Manager                              │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────────────────┐   │
│  │  Filters        │  │  Cycles List                │   │
│  │  ───────────    │  │  ────────────────────────── │   │
│  │  State: [All ▼] │  │  ID   User    Week   State  │   │
│  │  User:  [All ▼] │  │  001  Alice   W01   Sched   │   │
│  │  Week:  [    ]  │  │  002  Bob     W01   Commit  │   │
│  │  [Search]       │  │  003  Carol   W01   Shipped │   │
│  └─────────────────┘  └─────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │  Cycle Detail (selected)                            ││
│  │  ──────────────────────────────────────────────────│││
│  │  User: Alice Test       Week: 2024-W03            │ │
│  │  State: Scheduled       Box: BOX-001              │ │
│  │                                                    │ │
│  │  Timeline:                                         │ │
│  │  ● Scheduled: 2024-01-15 10:00                    │ │
│  │  ○ Committed: (pending)                           │ │
│  │  ○ Shipped: (pending)                             │ │
│  │                                                    │ │
│  │  Garments:                                         │ │
│  │  - G001 TOP-CREW-BLK (Reserved)                   │ │
│  │  - G015 BTM-JEAN-BLU (Reserved)                   │ │
│  │                                                    │ │
│  │  Actions:                                          │ │
│  │  [Commit Cycle]  [Cancel Cycle]                   │ │
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  [+ Create New Cycle]                                   │
└─────────────────────────────────────────────────────────┘
```

#### Create Cycle Form (T029)

Modal or slide-out with:

1. **userSelect** (Select)
   - Options: Query Users where operational_state = 'Active'
   - Label: "User"

2. **weekIdInput** (Text Input)
   - Auto-suggest next week: `{{moment().add(1, 'week').format('YYYY-[W]WW')}}`
   - Label: "Week ID"

3. **uniquenessCheck** (Hidden query)
   - Before create, check: No existing cycle with same user_id + week_id
   - Show error if duplicate

4. **createCycleButton** (Button)
   - Disabled if uniqueness check fails
   - On click: Create Cycles record with state = 'Scheduled'

---

## Phase 5: User Manager (T033-T036)

### Create Page: UserManager

#### Layout

```
┌─────────────────────────────────────────────────────────┐
│  YFT Admin - User Manager                               │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐│
│  │  Users                              [+ Add User]    ││
│  │  ─────────────────────────────────────────────────  ││
│  │  Name          State        Anchor   Cycles        ││
│  │  Alice Test    ● Active     Monday   3 active      ││
│  │  Bob Test      ● Active     Tuesday  2 active      ││
│  │  Carol Test    ⚠ HoldPay    Wed      1 blocked     ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │  User Detail: Carol Test                            ││
│  │  ──────────────────────────────────────────────────│││
│  │  State: ⚠ HoldPayment                              │ │
│  │  Since: 2024-01-14 (2 days)                        │ │
│  │                                                    │ │
│  │  Active Cycles:                                     │ │
│  │  - Cycle 003: Scheduled (blocked by hold)          │ │
│  │                                                    │ │
│  │  Garments in Custody: 0                            │ │
│  │                                                    │ │
│  │  State History:                                     │ │
│  │  2024-01-14  Active → HoldPayment (payment_failed)│ │
│  │  2024-01-01  (created) → Active                   │ │
│  │                                                    │ │
│  │  Actions:                                          │ │
│  │  [Remove Hold]  [Apply Hold...]  [Close Account]  │ │
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

#### State Transition Controls (T036)

**Apply Hold Modal:**
- Select hold type: HoldPayment, HoldLogistics, HoldIdentity
- Enter reason (required)
- Confirm button

**Remove Hold Action:**
- Verify hold can be removed (e.g., payment restored)
- Transition to Active
- Re-evaluate blocked cycles

---

## Phase 6: Box Packer (T037-T043)

### Create Page: BoxPacker in YFT-WarehouseOps

#### Layout

```
┌─────────────────────────────────────────────────────────┐
│  YFT Warehouse - Box Packer                             │
├─────────────────────────────────────────────────────────┤
│  Box: [BOX-001 ▼]  (Picking)          Cycle: 003       │
│  User: Carol Test                                       │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────────────┐  ┌─────────────────────────┐ │
│  │  Planned Contents     │  │  Scanned Contents       │ │
│  │  ─────────────────    │  │  ───────────────────    │ │
│  │  □ G001 TOP-CREW-BLK  │  │  ✓ G001 TOP-CREW-BLK   │ │
│  │  □ G015 BTM-JEAN-BLU  │  │                         │ │
│  │  □ G021 DRS-MIDI-BLK  │  │  Scan: [________] [+]  │ │
│  └───────────────────────┘  └─────────────────────────┘ │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │  ⚠ VARIANCE DETECTED                                ││
│  │  Missing: G015, G021                                ││
│  │                                                     ││
│  │  [Scan Missing Items]  [Commit to Observed Set]    ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  [Verify Pack] (disabled until variance resolved)       │
└─────────────────────────────────────────────────────────┘
```

#### Variance Detection Logic (T040)

```javascript
// Compare planned vs actual
const planned = new Set(box.planned_contents.map(g => g.barcode));
const actual = new Set(box.actual_contents.map(g => g.barcode));

const missing = [...planned].filter(b => !actual.has(b));
const extra = [...actual].filter(b => !planned.has(b));

const hasVariance = missing.length > 0 || extra.length > 0;

return {
  hasVariance,
  missing,
  extra
};
```

#### Commit to Observed (T041, T043)

```javascript
// When "Commit to Observed Set" clicked:
// 1. Create CompensatingAllocation event
await createEvent({
  entity_type: 'Box',
  entity_id: box.box_id,
  from_state: 'Picking',
  to_state: 'Picking', // State doesn't change
  transition_type: 'Compensating',
  metadata: JSON.stringify({
    type: 'CompensatingAllocation',
    planned: planned,
    actual: actual,
    missing: missing,
    extra: extra,
    reason: 'operator_committed_observed'
  })
});

// 2. Allow verification to proceed
```

---

## Phase 7: Event Viewer (T044-T048)

### Create Page: EventViewer in YFT-AdminConsole

#### Layout

```
┌─────────────────────────────────────────────────────────┐
│  YFT Admin - Event Viewer                               │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐│
│  │  Filters                                            ││
│  │  Entity Type: [All ▼]  Entity ID: [____]           ││
│  │  Transition: [All ▼]   Date Range: [__] to [__]    ││
│  │  [Search]  [Clear]                                  ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │  Events (234 results)                               ││
│  │  ─────────────────────────────────────────────────  ││
│  │  Time         Entity      From → To        Actor   ││
│  │  01-15 10:00  Garment 1   Avail → Reserv   system  ││
│  │  01-15 10:01  Box 1       Plan → Picking   op_01   ││
│  │  01-15 10:05  Garment 1   Reserv → Packed  op_01   ││
│  │  01-15 10:15  Cycle 3     Sched → Commit   system  ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │  Event Detail                                       ││
│  │  ──────────────────────────────────────────────────│││
│  │  Event ID: 1234                                    │ │
│  │  Entity: Garment #1                                │ │
│  │  Transition: Available → Reserved (Normal)         │ │
│  │  Timestamp: 2024-01-15 10:00:00                   │ │
│  │  Actor: system                                     │ │
│  │  Cycle: 3                                          │ │
│  │  Metadata: {"reason": "cycle_allocation"}          │ │
│  │                                                    │ │
│  │  [View Entity] [View Cycle]                        │ │
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

#### Entity History Reconstruction (T047)

Create a "Timeline" view component:

```javascript
// Query all events for a specific entity
const entityHistory = events
  .filter(e => e.entity_type === selectedType && e.entity_id === selectedId)
  .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

// Render as vertical timeline
// Each node shows: timestamp, from_state → to_state, actor
```

---

## Phase 8: Dashboard & Inspection (T050-T051)

### Create Page: Dashboard in YFT-AdminConsole

Summary cards with:
- Active Users count
- Available Garments count
- Open Cycles by state (pie chart)
- Recent Rejections (alert list)

### Create Page: InspectionStation in YFT-WarehouseOps

For garments in `ReceivedReturn` state:
- List pending inspection
- Click to open inspection form
- Grade condition (A/B/C/D/F)
- Select routing: Refurbish, Repair, Quarantine, Retired
- One-click transition

---

## Mobile App (T026-T027)

### Create App: YFT-Mobile

1. Create new app → Select "Mobile"
2. Add GarmentScanner page (simplified version)
3. Enable camera barcode scanning
4. Deploy to Retool Mobile app

Key differences from web:
- Larger touch targets
- Camera scanner as primary input
- Simplified layout for one-hand operation

---

## Verification Checklist

After Retool setup:

- [ ] Can scan garment and see details
- [ ] Can transition garment to valid states
- [ ] Invalid transitions show error
- [ ] Events logged for all transitions
- [ ] Can create cycle with uniqueness check
- [ ] Can manage user holds
- [ ] Box packer detects variance
- [ ] Event viewer shows history
- [ ] Dashboard shows correct counts
- [ ] Mobile app works with barcode camera
