/**
 * Airtable Automation Script: Enforce Lifecycle Bounds
 *
 * Trigger: When Garment record matches condition (asset_state = "ReceivedReturn")
 * Action: Check if lifecycle exceeded and update to Retired if needed
 *
 * Input configuration:
 * - garment_id: {garment_id} from trigger record
 * - wear_count: {wear_count} from trigger record
 * - max_wear_limit: {max_wear_limit} from trigger record
 * - condition_grade: {condition_grade} from trigger record
 */

let inputConfig = input.config();

let garmentId = inputConfig.garment_id;
let wearCount = inputConfig.wear_count || 0;
let maxLimit = inputConfig.max_wear_limit || 50;
let conditionGrade = inputConfig.condition_grade || 'A';

// Check lifecycle bounds
let lifecycleExceeded = wearCount >= maxLimit;
let conditionFailed = conditionGrade === 'F';

let shouldRetire = lifecycleExceeded || conditionFailed;

// Determine reason
let retireReason = '';
if (lifecycleExceeded) {
    retireReason = 'lifecycle_exceeded';
} else if (conditionFailed) {
    retireReason = 'condition_failed';
}

// Output for conditional action
output.set('should_retire', shouldRetire);
output.set('retire_reason', retireReason);
output.set('garment_id', garmentId);

if (shouldRetire) {
    console.log(`Garment ${garmentId} should be retired: ${retireReason}`);
} else {
    console.log(`Garment ${garmentId} lifecycle OK: ${wearCount}/${maxLimit}`);
}
