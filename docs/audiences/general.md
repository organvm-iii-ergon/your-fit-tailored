# Your-Fit-Tailored: a two-minute explanation

## What is this?

Your-Fit-Tailored is the design record for a proposed clothing service. Instead
of asking a subscriber to shop for individual garments, the service would send
a prepared box on a weekly rhythm. The subscriber would wear the garments,
return the previous box, and let the operator clean, inspect, and recirculate
the inventory.

This repository is not the service itself. It is the body of material used to
define and inspect the idea: the rules the service must follow, the way garment
and shipment states would be recorded, the proposed economics, the instructions
for assembling a small pilot, and the procedures an operator would use when
something goes wrong.

## What problem led to it?

The project begins from a simple observation: clothing can demand repeated
attention even when a person does not want clothing to be a project. Shopping,
judging fit, making returns, maintaining a wardrobe, and replacing unsuitable
items all create small decisions that accumulate.

The design asks whether a service can take responsibility for those repeated
decisions without becoming unreliable or opaque. That creates two problems at
once:

1. the subscriber should have less routine work; and
2. the operator must know where every reusable garment and box is, what
   condition it is in, and what promise has been made for the next week.

The repository calls this a **temporal service** because the central product is
not a purchased garment. It is the continuity of a weekly experience.

## What would happen when someone used it?

In the specified workflow, a subscriber would have a weekly anchor day. Before
that day, an operator would allocate garments using a fit profile, verify the
contents of a box, and dispatch it. The subscriber would wear the garments and
return them in the circulating container. On return, the operator would inspect
each garment, record its condition, send it to cleaning or repair when needed,
and either make it available for another cycle or remove it from service.

Every movement is designed as an explicit state change. A late return, damaged
garment, failed payment, missing carrier scan, or incorrect box is not supposed
to disappear into an informal note. The design gives each failure a named state
and a recovery path.

That is the proposal. The repository does not show that this workflow has been
run with real subscribers.

## A concrete example

Imagine a subscriber whose weekly anchor is Monday. The proposed system creates
a cycle, confirms that the subscriber is eligible, reserves suitable garments,
and binds them to a reusable box. A warehouse operator scans the actual contents
before shipping. If the carrier reports delivery, the wear window opens. When
the previous box returns, its garments are inspected and their wear, wash, and
repair counts advance.

If the subscriber reports that one garment fit poorly, the intended future fit
model would treat that report as evidence that changes a probability, not as a
permanent declaration that a size either “fits” or “does not fit.” During the
proposed pilot, that allocation and learning step would remain substantially
manual.

This example is a scenario derived from the specifications, not a customer case
study.

## Why might it matter?

The project joins three questions that are often separated:

- Can clothing access require less attention from the wearer?
- Can reusable physical inventory circulate without losing state truth?
- Can every cycle create information that improves the next cycle?

Its strongest idea is not simply “clothes by subscription.” It is the insistence
that ease for the user must be earned by disciplined operations. If cognitive
load disappears from the front of the system only because unrecorded labor,
errors, or inventory loss accumulate behind it, the design has failed by its own
rules.

## What exists now?

| Part | Current evidence |
|---|---|
| System principles and architecture | Present as detailed specifications and six constitutional invariants. |
| Economics and operating model | Present as documents, spreadsheets, risk analysis, and proposed pilot metrics. Not validated by operating results. |
| Pilot assembly materials | Airtable and Retool setup guides, seed data, six Airtable-targeted scripts, email templates, SOPs, and a launch checklist are present. No configured external environment is evidenced. |
| TypeScript code | A small catalog and subscription-management scaffold exists and has 16 passing unit tests. It models generic products and subscription tiers, not the specified circular garment, box, cycle, fit, or logistics system. |
| Live service | Not present. |
| Completed pilot or active users | Not evidenced. |
| Commercial, fit, environmental, or financial outcomes | Not evidenced. |

The honest current label is **design only**, at the recorded end of Epoch 0.
The next project phase would be the foundation build, followed by an end-to-end
validation before any live pilot claim could be made.

## Where to go next

- If you build software, read the [technical edition](technical.md).
- If you are interested in the cultural argument, read the
  [humanities edition](humanities.md).
- If you are evaluating the operating model, read the
  [business edition](business.md).
- If you need contribution boundaries, read the
  [evaluation record](evaluator.md).
- To inspect claims directly, use the [evidence record](../evidence/README.md).
- For the complete design argument, return to the
  [canonical README](../../README.md).
