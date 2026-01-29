/**
 * Airtable Automation Script: Log Garment Transition
 *
 * Trigger: When record updated in Garments table (asset_state field changed)
 * Action: Create record in Events table
 *
 * Input configuration (set in automation):
 * - garment_id: {garment_id} from trigger record
 * - new_state: {asset_state} from trigger record
 * - cycle_id: {current_cycle_id} from trigger record (may be empty)
 * - actor_id: "system" (or pass from API call if user-initiated)
 */

// Get input from automation config
let inputConfig = input.config();

// Extract values
let garmentId = inputConfig.garment_id;
let newState = inputConfig.new_state;
let cycleId = inputConfig.cycle_id || null;
let actorId = inputConfig.actor_id || 'system';

// Note: Airtable automations don't have access to "previous" value natively
// For full tracking, you'd need to store previous_state in a field
// or use the Airtable API with record history
let fromState = inputConfig.from_state || 'Unknown';

// Create timestamp
let timestamp = new Date().toISOString();

// Generate idempotency key
let idempotencyKey = `garment-${garmentId}-${newState}-${timestamp}`;

// Prepare event record
let eventRecord = {
    entity_type: 'Garment',
    entity_id: garmentId,
    from_state: fromState,
    to_state: newState,
    transition_type: 'Normal',
    actor_id: actorId,
    cycle_id: cycleId,
    idempotency_key: idempotencyKey,
    metadata: JSON.stringify({
        triggered_by: 'automation',
        timestamp: timestamp
    })
};

// Output for next action (Create record in Events)
output.set('event_record', eventRecord);

console.log(`Logged transition: Garment ${garmentId} -> ${newState}`);
