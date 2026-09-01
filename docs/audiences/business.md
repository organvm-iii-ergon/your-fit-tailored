# Your-Fit-Tailored: operational edition

## Decision summary

Your-Fit-Tailored is a **design-only operating model** for a proposed weekly,
circular apparel subscription. It is not a vendor offering, configured pilot,
or operating company in the evidence available here. The repository is useful
today as a detailed venture and workflow specification. It does not yet support
claims about adoption, savings, fit performance, retention, contribution
margin, or environmental benefit.

## Existing operational problem

The project is organized around a hypothetical service promise: deliver a
prepared clothing box on a stable weekly cadence, recover the previous box,
inspect and refurbish the garments, and use what happened to improve later
allocations.

That promise creates an operational control problem. Reusable inventory can be
lost, delayed, damaged, double-allocated, incorrectly packed, or unavailable in
the needed size. Carrier events can arrive late or contradict physical reality.
Returns can miss the processing window needed for the next week's allocation.
Fit can change across bodies, brands, garments, and time. A smooth subscriber
experience depends on the operator containing that variance without asking the
subscriber to manage the system.

The repository does not establish that a current business is experiencing this
problem. It specifies the problem a future pilot would test.

## Who would experience it?

The planned workflow has two primary constituencies:

- **Subscribers** who want recurring access to suitable clothing without
  browsing, buying, accumulating, and repeatedly deciding what to keep.
- **Pilot operators** responsible for inventory truth, allocation, pick/pack,
  shipment, return, inspection, cleaning/repair routing, exception resolution,
  communications, and weekly metrics.

Other required participants sit outside the designed system boundary: carriers,
cleaning and repair providers, payment and identity services, email channels,
and suppliers of physical garments and reusable boxes.

There is no evidenced user cohort, customer segment validation, operating team,
or signed external partner.

## Current workaround and market premise

The repository positions the concept against retail shopping, styling services,
rental platforms, and conventional subscription boxes. In that positioning,
the user generally still browses, selects, purchases, times a rental, or makes a
keep-or-return decision. Your-Fit-Tailored proposes to move those repeated
decisions into a managed weekly service.

This is a design premise, not a current competitive study. The repository does
not include fresh market research proving that existing services lack comparable
features, that a target segment will adopt this exact cadence, or that customers
will accept the modeled price range.

## Proposed changed workflow

| Stage | Proposed operator action | Canonical output |
|---|---|---|
| Onboard | Verify subscriber, address, payment state, weekly anchor, and initial fit information. | Active user and fit-profile references. |
| Schedule | Create one cycle for the subscriber's next week. | `Scheduled` cycle with a unique user/week scope. |
| Allocate | Select garments using manual fit judgment in the pilot; check lifecycle eligibility and inventory. | Planned garment set with recorded confidence/constraints. |
| Commit | Confirm subscriber eligibility, inventory, box, and timing before making a promise. | `Committed` cycle and reserved assets. |
| Pack and dispatch | Scan actual contents, reconcile variance, hand off to carrier, and send minimal communication. | Auditable box contents and outbound custody state. |
| Wear and return | Open time windows by policy; issue reminders only when progress is missing. | Wear/return events and exception records. |
| Receive and inspect | Scan returns, grade condition, route cleaning/repair/quarantine/retirement, and reconcile missing items. | Updated asset states and lifecycle counters. |
| Learn and settle | Capture optional feedback, update fit evidence, compute charges/credits, and close the cycle. | Closed cycle, retained history, and next-cycle inputs. |

Every stage is currently a specified workflow. The repository does not contain
evidence of a complete cycle executing against configured systems.

## Inputs and outputs

### Required inputs

- subscriber identity, contact, address, weekly anchor, eligibility, and payment
  reference;
- fit profile and later fit/experience signals;
- garment identity, category, size, condition, lifecycle bounds, and custody;
- reusable box identity and planned/measured contents;
- carrier, return, cleaning, repair, and inspection events;
- pricing, timing, hold, loss, and exception policies;
- operator decisions and approvals.

### Intended outputs

- one auditable weekly cycle per active subscriber;
- shipment and return work queues;
- authoritative garment, box, user, and cycle states;
- exception queues with named recovery paths;
- communication events;
- fit-learning evidence;
- lifecycle and utilization records;
- operational and economic metrics.

The current repository outputs documents, spreadsheets, CSVs, setup
instructions, and scripts—not those live operational records.

## Integration and resource requirements

The planned pilot depends on more than software configuration:

1. **Airtable** configured from the proposed 17-table setup.
2. **Retool** applications manually assembled from the page/query guides.
3. **Scanning** through barcodes or a phone/camera workflow; hardware and
   symbology are not selected.
4. **Physical inventory** sized across participant fit needs, plus reusable
   boxes and buffer stock.
5. **Cleaning, inspection, repair, quarantine, and disposal** workflows with
   safety standards.
6. **Outbound and reverse logistics**, labels, carrier accounts, and exception
   escalation.
7. **Payment and identity handling**; the roadmap explicitly identifies payment
   integration as missing.
8. **Operator staffing and training** for fulfillment, inventory control,
   inspection, support, and management.
9. **Privacy, legal, insurance, and user agreements**, which are not complete in
   the repository.
10. **Validation instrumentation** for cycle, fit, shrink, labor, support, and
    contribution-margin measurements.

None of these external integrations or commitments is evidenced as active.

## Economics and decision gates

The economic model uses one **User-Week Cycle** as its unit. It represents
subscription revenue against cleaning, two-way logistics, pick/pack, inbound
processing, loss/damage, replacement, payment fees, support, and exception
costs. Inventory capital is modeled through an inventory multiple: items per
box multiplied by total cycle time and a safety-stock factor.

The repository's value is that it names failure conditions rather than assuming
scale repairs the model. The design should stop, pivot, or reprice if logistics
and cleaning establish a cost floor above viable subscription yield, if returns
break the cadence, if shrink exceeds bounds, if labor per cycle does not fall,
or if users do not value the service.

Spreadsheets and formulas are not outcome evidence. No price cohort, cost curve,
contribution margin, customer acquisition cost, retention rate, or willingness
to pay has been observed here.

## Risks and constraints

| Risk | Current boundary |
|---|---|
| Return compliance cascade | Identified as critical; no mini-pilot evidence. |
| Unit-economics sensitivity | Modeled, but no observed supplier, carrier, labor, cleaning, or retention data. |
| Inventory working capital | Preliminary model only; funding and procurement not evidenced. |
| Airtable/Retool execution | Detailed setup exists; no configured environment or end-to-end validation. |
| Manual allocation bottleneck | Intentionally accepted for a small pilot; no measured operator time. |
| Fit value proposition | Probabilistic model is conceptual and pilot allocation is manual. |
| Payment, legal, privacy, safety, and insurance | Material pre-pilot gaps. |
| Key-person dependence | SOPs reduce tacit knowledge but no staffed redundancy is evidenced. |
| Environmental claims | Circular flow is designed; lifecycle impact has not been measured. |
| Market differentiation | Articulated by the project, not validated through current market research. |

## Current deployment status

- The repository is configured to publish its documentation through GitHub Pages.
- It is not the proposed clothing service or an operator console.
- No configured Airtable base or Retool app is versioned or externally evidenced.
- No completed launch checklist, Epoch 1 build, or Epoch 2 pilot record exists.
- The only locally executable software is a generic in-memory TypeScript catalog
  and subscription scaffold that does not implement the intended workflow.

Accordingly, “active,” “pilot-ready,” “deployed product,” and “operational” are
not supported project-status labels.

## Evidence versus projected value

| Statement | Classification | Boundary |
|---|---|---|
| The repository contains a coherent operating specification and pilot assembly package. | Verified | Artifacts exist; external configuration and execution do not. |
| Six Airtable-targeted scripts encode scheduling, commitment, window, return, event, and lifecycle logic. | Partial implementation | No hosted execution, local integration harness, or end-to-end results. |
| A 25-user pilot can be assembled from the instructions in three weeks. | Proposed | The duration is a roadmap estimate and has not been measured. |
| Weekly circulation will reduce decision load. | Proposed hypothesis | No user study or active cohort. |
| Fit quality will improve over cycles. | Proposed hypothesis | No implemented fit model or longitudinal data. |
| Unit economics can become non-negative. | Proposed hypothesis | No observed cost or revenue data. |
| The service reduces environmental impact. | Unknown | Circulation alone is not a lifecycle assessment. |
| The system is commercially differentiated. | Proposed positioning | No current comparative market validation in the repository. |

## Before a credible pilot claim

A minimum evidence gate would require:

- configured and exportable Airtable/Retool surfaces;
- fixed dependency/CI state and tests for Airtable scripts or equivalent runtime;
- one synthetic end-to-end cycle with state and event reconciliation;
- completion of payment, privacy, safety/hygiene, legal, insurance, and dispute
  boundaries;
- selected scanning, carrier, cleaning, and physical-inventory workflows;
- a completed launch checklist with named approvals;
- a small return-compliance test before a 25-person cohort;
- an explicit evidence capture plan for fit, labor, shrink, cadence, support, and
  per-cycle economics.

## Technical appendix and evidence

- [Technical edition](technical.md)
- [Contribution and evaluation record](evaluator.md)
- [Claim-level evidence record](../evidence/README.md)
- [Implementation tracker](../../implementation/IMPLEMENTATION-STATUS.md)
- [Roadmap and risk analysis](../../roadmap/THERE-AND-BACK-AGAIN.md)
- [Canonical README](../../README.md)
