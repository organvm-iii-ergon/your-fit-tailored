# Airtable Setup Guide: State Authority Subsystem

## Prerequisites

- Airtable Pro account (required for automations)
- Access to create bases in your workspace

## Phase 1: Create Base and Tables (T001-T010)

### T001: Create Base

1. Go to [airtable.com](https://airtable.com)
2. Click "Add a base" → "Start from scratch"
3. Name it: `YFT-StateAuthority`
4. Delete the default table

### T002-T003: Create Lookup Tables

#### States Table
1. Create new table: `States`
2. Add fields:
   | Field Name | Type | Options |
   |------------|------|---------|
   | state_name | Single line text | Primary field |
   | entity_type | Single select | User, Garment, Box, Cycle |
   | description | Long text | |
   | sort_order | Number | |

3. Populate with data from `seed-data/states.csv`

#### ErrorCodes Table
1. Create new table: `ErrorCodes`
2. Add fields:
   | Field Name | Type |
   |------------|------|
   | error_code | Single line text | Primary field |
   | error_name | Single line text |
   | error_message | Long text |
   | resolution_hint | Long text |

3. Populate with data from `seed-data/error-codes.csv`

### T004: Create Users Table

1. Create new table: `Users`
2. Rename primary field to `user_id` (Auto number)
3. Add fields in order:

| Field Name | Type | Configuration |
|------------|------|---------------|
| display_name | Single line text | Required |
| operational_state | Single select | Active, Paused, HoldPayment, HoldIdentity, HoldLogistics, Closed |
| weekly_anchor | Single select | Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday |
| email | Email | |
| phone | Phone | |
| address_line1 | Single line text | |
| address_line2 | Single line text | |
| city | Single line text | |
| state | Single line text | |
| zip | Single line text | |
| payment_method_ref | Single line text | (reference only for pilot) |
| fit_profile_ref | Link to another record | (will link to FitProfiles later) |
| created_at | Created time | |
| updated_at | Last modified time | |

### T005: Create Garments Table

1. Create new table: `Garments`
2. Rename primary field to `garment_id` (Auto number)
3. Add fields:

| Field Name | Type | Configuration |
|------------|------|---------------|
| barcode | Single line text | Required, unique |
| sku | Single line text | Required |
| asset_state | Single select | Available, Reserved, Packed, InTransitOutbound, Delivered, InUse, InTransitReturn, ReceivedReturn, Quarantine, Refurbish, Repair, Lost, Retired, Disposed |
| condition_grade | Single select | A, B, C, D, F |
| size | Single line text | |
| color | Single line text | |
| category | Single select | Top, Bottom, Dress, Outerwear, Accessory |
| wear_count | Number | Default: 0 |
| wash_count | Number | Default: 0 |
| repair_count | Number | Default: 0 |
| max_wear_limit | Number | Default: 50 |
| current_cycle_id | Link to another record | Link to Cycles |
| current_box_id | Link to another record | Link to Boxes |
| notes | Long text | |
| created_at | Created time | |
| retired_at | Date | |

4. Add formula field `lifecycle_remaining`:
   ```
   {max_wear_limit} - {wear_count}
   ```

5. Add formula field `over_limit`:
   ```
   IF({wear_count} >= {max_wear_limit}, TRUE(), FALSE())
   ```

### T006: Create Boxes Table

1. Create new table: `Boxes`
2. Rename primary field to `box_id` (Auto number)
3. Add fields:

| Field Name | Type | Configuration |
|------------|------|---------------|
| box_barcode | Single line text | Required, unique |
| container_state | Single select | Created, Planned, Picking, PackedVerified, Shipped, Delivered, ReturnInitiated, Returning, Received, Reconciled, Closed |
| cycle_id | Link to another record | Link to Cycles |
| planned_contents | Link to another record | Link to Garments (allow multiple) |
| actual_contents | Link to another record | Link to Garments (allow multiple) |
| tracking_outbound | Single line text | |
| tracking_return | Single line text | |
| created_at | Created time | |

4. Add formula field `has_variance`:
   ```
   IF(
     AND(
       LEN(ARRAYJOIN({planned_contents})) > 0,
       LEN(ARRAYJOIN({actual_contents})) > 0
     ),
     IF(
       ARRAYJOIN(ARRAYUNIQUE(ARRAYCOMPACT({planned_contents})), ",") !=
       ARRAYJOIN(ARRAYUNIQUE(ARRAYCOMPACT({actual_contents})), ","),
       TRUE(),
       FALSE()
     ),
     FALSE()
   )
   ```

5. Add formula field `garment_count`:
   ```
   COUNTA({actual_contents})
   ```

### T007: Create Cycles Table

1. Create new table: `Cycles`
2. Rename primary field to `cycle_id` (Auto number)
3. Add fields:

| Field Name | Type | Configuration |
|------------|------|---------------|
| user_id | Link to another record | Link to Users |
| week_id | Single line text | Required (format: YYYY-WNN) |
| cycle_state | Single select | Scheduled, Committed, FulfillmentInProgress, OutboundInTransit, Delivered, WearWindowOpen, ReturnWindowOpen, ReturnInTransit, CloseoutInspection, Settled, Closed |
| box_id | Link to another record | Link to Boxes |
| scheduled_at | Date | |
| committed_at | Date | |
| shipped_at | Date | |
| delivered_at | Date | |
| return_initiated_at | Date | |
| return_received_at | Date | |
| settled_at | Date | |
| closed_at | Date | |

4. Add formula field `user_week_key` (for uniqueness check):
   ```
   CONCATENATE({user_id}, "-", {week_id})
   ```

### T008: Create Events Table

1. Create new table: `Events`
2. Rename primary field to `event_id` (Auto number)
3. Add fields:

| Field Name | Type | Configuration |
|------------|------|---------------|
| entity_type | Single select | User, Garment, Box, Cycle |
| entity_id | Number | |
| from_state | Single line text | |
| to_state | Single line text | |
| transition_type | Single select | Normal, Compensating, Rejection |
| timestamp | Created time | |
| actor_id | Single line text | |
| cycle_id | Number | |
| metadata | Long text | (JSON format) |
| idempotency_key | Single line text | |
| error_code | Single line text | |

### T009: Create TransitionRules Table

1. Create new table: `TransitionRules`
2. Rename primary field to `rule_id` (Auto number)
3. Add fields:

| Field Name | Type | Configuration |
|------------|------|---------------|
| entity_type | Single select | User, Garment, Box, Cycle |
| from_state | Single line text | |
| to_state | Single line text | |
| preconditions | Long text | (JavaScript expression) |
| postconditions | Long text | (Actions to perform) |
| is_active | Checkbox | Default: checked |
| description | Long text | |

4. Populate with data from `seed-data/transition-rules.csv`

### T010: Configure Linked Record Relationships

Verify these links are configured:
- Garments.current_cycle_id → Cycles
- Garments.current_box_id → Boxes
- Boxes.cycle_id → Cycles
- Boxes.planned_contents → Garments (multiple)
- Boxes.actual_contents → Garments (multiple)
- Cycles.user_id → Users
- Cycles.box_id → Boxes

---

## Phase 2: Create Automations (T015-T021)

### Important: Automation Architecture

Due to Airtable automation limits, we use a simplified approach:
- Automations log events AFTER transitions (not validation before)
- Validation is done in Retool before triggering updates
- Events table serves as audit log

### T015: ValidateGarmentTransition Automation

1. Go to Automations tab
2. Create new automation: `Log Garment Transition`
3. Trigger: "When record updated" in Garments table
   - Watch field: `asset_state`
4. Action: "Create record" in Events table
   - entity_type: "Garment"
   - entity_id: `{garment_id}` (from trigger)
   - from_state: (use previous value if available, otherwise "Unknown")
   - to_state: `{asset_state}` (from trigger)
   - transition_type: "Normal"
   - actor_id: "system"

See `automations/log-garment-transition.js` for the full script.

### T016-T018: Similar automations for Cycle, User, Box

Create identical automations for each entity type, adjusting:
- Table name
- Primary key field name
- State field name

### T019: LogTransitionEvent

This is handled by the individual entity automations above.

### T020: EnforceLifecycleBounds

1. Create automation: `Check Lifecycle Bounds`
2. Trigger: "When record matches conditions" in Garments
   - Condition: `asset_state = "ReceivedReturn"`
3. Action: Run script

```javascript
// See automations/enforce-lifecycle-bounds.js
let garment = input.config();
let wearCount = garment.wear_count || 0;
let maxLimit = garment.max_wear_limit || 50;

if (wearCount >= maxLimit) {
    // Update garment to Retired
    output.set('should_retire', true);
} else {
    output.set('should_retire', false);
}
```

4. Add conditional action: If should_retire is true, update Garments record to `asset_state = "Retired"`

### T021: EnforceWeeklyUniqueness

1. Create automation: `Check Cycle Uniqueness`
2. Trigger: "When record created" in Cycles
3. Action: Run script to check for duplicates

```javascript
// See automations/enforce-weekly-uniqueness.js
let newCycle = input.config();
let userId = newCycle.user_id;
let weekId = newCycle.week_id;

// Query for existing cycles with same user_week_key
// If found, mark for deletion or rejection
```

**Note**: Airtable doesn't support pre-create validation, so this automation flags duplicates after creation. The Retool UI should check BEFORE creating.

---

## Verification Checklist

After completing Phase 1 and 2:

- [ ] All 9 tables created with correct fields
- [ ] Linked relationships working (can select related records)
- [ ] Formula fields calculating correctly
- [ ] Single select options match spec exactly
- [ ] Automations created and enabled
- [ ] Test: Create a garment, change state, verify Event created

---

## Next Steps

After Airtable setup is complete:
1. Import seed data from CSV files
2. Set up Retool apps (see `../retool/SETUP-GUIDE.md`)
3. Run validation scenarios from quickstart.md
