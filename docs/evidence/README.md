# Your-Fit-Tailored: evidence record

This page bounds the material claims used across the five audience editions.
`project-record.yml` is the machine-readable factual substrate; this table is
the readable inspection layer. A repository path proves that an artifact exists.
It does not, by itself, prove deployment, adoption, performance, or business
outcomes.

## Status vocabulary

- **Verified**: directly supported by an inspectable repository artifact or a
  local verification run.
- **Partial**: some relevant implementation or evidence exists, with a material
  named boundary.
- **Proposed**: an intended capability, workflow, application, or hypothesis.
- **Unknown**: the required evidence is not available here.
- **Contradicted**: available evidence conflicts with the public claim.

## Claim table

| ID | Claim | Status | Evidence | Limitation |
|---|---|---|---|---|
| `project-definition` | Your-Fit-Tailored is designed as a weekly circular apparel subscription intended to reduce repeated clothing decisions while maintaining inventory and cycle state. | Verified as project definition | [`README.md`](../../README.md); [`memory/constitution.md`](../../memory/constitution.md); [`specs/core-system/theoretical-foundation.md`](../../specs/core-system/theoretical-foundation.md) | This verifies what the project proposes, not that the service exists or produces the intended effect. |
| `design-invariants` | The repository defines six constitutional invariants: weekly cadence, circular inventory, state truth, explicit failure handling, probabilistic fit, and cognitive-load minimization. | Verified | [`memory/constitution.md`](../../memory/constitution.md) | The invariants have not been validated against a live system or independent review record. |
| `domain-architecture` | The repository specifies four core entities, seven logical subsystems, state transitions, normal cycle flow, and explicit failure paths. | Verified as documentation | [`specs/core-system/spec.md`](../../specs/core-system/spec.md); [`specs/features/state-authority/`](../../specs/features/state-authority/); [`specs/features/weekly-cycle-flow/`](../../specs/features/weekly-cycle-flow/) | No corresponding runtime implementation exists in `src/`. |
| `implementation-package` | Setup instructions, seed/reference data, Retool page specifications, pilot SOPs, communication templates, and launch checks are present. | Verified as artifacts | [`implementation/IMPLEMENTATION-STATUS.md`](../../implementation/IMPLEMENTATION-STATUS.md); [`implementation/airtable/`](../../implementation/airtable/); [`implementation/retool/`](../../implementation/retool/); [`implementation/pilot-ops/`](../../implementation/pilot-ops/) | Artifact completion is not external-system configuration or launch readiness. The tracker says tasks are “ready to execute,” not executed. |
| `automation-scripts` | Six JavaScript scripts encode portions of the proposed Airtable workflow: event logging, lifecycle bounds, scheduling, commitment, wear-window progression, and overdue returns. | Partial | [`implementation/airtable/automations/`](../../implementation/airtable/automations/); [`implementation/airtable/weekly-cycle-flow/automations/`](../../implementation/airtable/weekly-cycle-flow/automations/) | No Airtable deployment receipt, local host mock, automated test suite, or end-to-end run. The event logger may record `from_state` as `Unknown`. |
| `typescript-scaffold` | The repository contains an in-memory TypeScript catalog and subscription manager that build and pass 16 unit tests. | Verified with boundary | [`src/catalog.ts`](../../src/catalog.ts); [`src/subscription.ts`](../../src/subscription.ts); [`tests/`](../../tests/); local `npm run build` and `npm test` on 2026-08-31 | The code models generic/fitness products and monthly tiers. It does not implement the specified garment, box, cycle, fit, logistics, state-authority, or event-sourcing system. |
| `tooling-health` | The declared default dependency and lint workflow is healthy. | Contradicted | `package.json`; `package-lock.json`; local `npm ci` and `npm run lint:eslint` on 2026-08-31 | `npm ci` fails because TypeScript 7.0.2 conflicts with `typescript-eslint` 8.67.0's peer range. A legacy-peer-dependency install permits build/tests, but ESLint still fails. |
| `runtime-status` | The intended circular-apparel platform has an executable runtime in this repository. | Contradicted | [`src/`](../../src/) contains only the generic scaffold; [`ecosystem.yaml`](../../ecosystem.yaml) marks web-app delivery `not_started`; [`seed.yaml`](../../seed.yaml) is normalized to `DESIGN_ONLY` | GitHub Pages publishes documentation, not the proposed service. |
| `pilot-status` | The service is active, pilot-ready, or has completed a pilot. | Contradicted | [`roadmap/THERE-AND-BACK-AGAIN.md`](../../roadmap/THERE-AND-BACK-AGAIN.md) places the project at the end of Epoch 0; [`implementation/pilot-ops/launch-checklist.md`](../../implementation/pilot-ops/launch-checklist.md) remains unchecked; [`specs/features/pilot-mvp/tasks.md`](../../specs/features/pilot-mvp/tasks.md) remains unexecuted | No configured pilot environment, participants, completed cycle, launch approval, or operational dataset is present. |
| `economics-status` | The repository contains a per-cycle economic model, spreadsheets, risks, and proposed decision gates. | Verified as model artifacts | [`specs/economics/`](../../specs/economics/); [`assets/Circular_Subscription_Unit_Economics_Simulator.xlsx`](../../assets/Circular_Subscription_Unit_Economics_Simulator.xlsx); [`assets/Circular_Subscription_Unit_Economics_Simulator_Advanced.xlsx`](../../assets/Circular_Subscription_Unit_Economics_Simulator_Advanced.xlsx); roadmap risk analysis | Inputs and outputs are modeled, not observed. No revenue, carrier, cleaning, labor, retention, or contribution-margin data is evidenced. |
| `authorship-record` | Anthony James Padavano is the primary human repository owner and maintainer; early foundational commits explicitly credit Claude Opus 4.5 as co-author. | Verified with attribution boundary | [Local Git commit receipt](git-commit-snapshot-2026-08-31.json); [`README.md`](../../README.md) author record | Commit-level attribution does not establish line-by-line human/AI authorship or the originality of every conceptual influence. Dependabot authored automated dependency commits. |
| `pages-publication` | The repository is configured to publish its documentation with GitHub Pages. | Verified | [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml); [`index.md`](../../index.md); [`seed.yaml`](../../seed.yaml); [local verification receipt](verification-2026-08-31.md) | The canonical documentation URL returned HTTP 200 on 2026-08-31. Availability can change, and documentation publication is not application deployment. |
| `fit-outcomes` | Fit confidence improves across real cycles. | Proposed | Fit-belief design in [`specs/core-system/spec.md`](../../specs/core-system/spec.md); proposed pilot criteria in [`specs/features/pilot-mvp/spec.md`](../../specs/features/pilot-mvp/spec.md) | No implemented fit model, real cycles, cohort, or longitudinal fit data. |
| `decision-load-outcome` | Subscribers experience lower cognitive load. | Proposed | Cognitive Load Minimization invariant; proposed experience contract in the core specification | No user study, active subscriber, comparison group, or outcome measurement. |
| `commercial-viability` | The service can achieve non-negative contribution margin and commercially sustainable operation. | Proposed | Economic model and pilot graduation criteria | No observed price acceptance, retention, variable cost, inventory loss, or margin data. |
| `environmental-benefit` | Circular garment flow reduces environmental impact. | Unknown | Circular lifecycle is specified | No lifecycle assessment, energy/water/transport measurement, garment displacement analysis, or comparative baseline. |
| `market-differentiation` | The concept is currently differentiated from all relevant apparel services. | Proposed positioning | [`README.md`](../../README.md) “Related Work” section; business-model documents | No fresh, comprehensive comparative market audit is included. Competitor capabilities can change. |

## Current project status derived from the evidence

The defensible status is **design only**:

- Epoch 0 specification and planning artifacts are present;
- pieces of proposed Airtable workflow code exist but are unintegrated;
- a generic TypeScript scaffold is locally testable but is not the domain
  platform;
- the foundation build and pilot remain unexecuted in the available record;
- public “active” and “pilot-ready” labels are contradicted by the repository's
  own implementation and roadmap evidence.

## Evidence needed to change status

Moving from `design-only` to `prototype` would require, at minimum, an executable
vertical slice of the intended domain: authoritative user/garment/box/cycle
state, one scheduled-through-closeout flow, retained event history, and tests
that exercise the specified invariants.

Any stronger operational status would additionally require a reproducible
deployment or configured-system export, completed end-to-end validation,
observable runtime evidence, and explicit security/human-approval boundaries.
A pilot claim would require named pilot parameters, participants or a verified
cohort count, completed launch approval, cycle records, exception and outcome
data, and an evidence-preserving report.

## Edition links

- [General edition](../audiences/general.md)
- [Technical edition](../audiences/technical.md)
- [Humanities edition](../audiences/humanities.md)
- [Operational edition](../audiences/business.md)
- [Evaluation edition](../audiences/evaluator.md)
- [Canonical README](../../README.md)
