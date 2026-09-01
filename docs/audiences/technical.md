# Your-Fit-Tailored: technical edition

## Implementation status

The canonical project status is **design only**. The repository is technically
substantial as a specification and setup corpus, but it does not contain a
runtime implementation of the architecture it describes.

| Surface | What is present | What is not evidenced |
|---|---|---|
| Domain architecture | Formal entities, state machines, transition contracts, event flows, failure paths, and seven logical subsystem boundaries. | Runtime services, database migrations, APIs, or an executable state-authority layer. |
| Airtable target | Table/setup instructions, CSV seed/reference data, and six automation scripts using Airtable globals such as `base`, `input`, and `output`. | A configured base, exported schema, credentials, local Airtable harness, integration tests, or deployment receipt. |
| Retool target | Detailed manual setup guides for two proposed applications and 20 named pages. | Retool application exports, a configured application, screenshots tied to a deployment, or end-to-end test evidence. |
| TypeScript package | `ProductCatalog` and `SubscriptionManager`, build configuration, CI, and 16 unit tests. | The specified User, Garment, Box, Cycle, fit-belief, logistics, event-sourcing, or circular-inventory behavior. |
| Pilot operations | SOPs, email templates, a launch checklist, risk analysis, and proposed success criteria. | A completed launch checklist, operator sign-off, real cycle data, users, or outcomes. |

The TypeScript package also describes “fitness products” and monthly
FREE/BASIC/PREMIUM/ENTERPRISE tiers. Those concepts do not match the canonical
weekly circular-apparel specification. Treat the package as a generic scaffold,
not as evidence that the platform is implemented.

## Specified system architecture

The design makes four entities authoritative:

- `UserEntity`: subscription eligibility, holds, address/payment viability, and
  an evolving fit profile;
- `GarmentEntity`: custody, condition, hygiene, use counts, repair, quarantine,
  retirement, and disposal;
- `BoxEntity`: the physical container binding planned and measured contents to
  a shipment;
- `CycleEntity`: one weekly temporal contract from scheduling through return,
  inspection, settlement, and closure.

The complete design is divided into seven logical subsystems in
[`specs/core-system/spec.md`](../../specs/core-system/spec.md):

1. State Authority
2. Fit Intelligence
3. Inventory Lifecycle
4. Logistics Orchestration
5. User Contract Enforcement
6. Experience Minimization
7. Observability, Audit, and Recovery

State Authority is intended to be the sole writer of canonical entity state.
Other subsystems propose allocations, interpret external signals, or enforce
policies, but they do not directly mutate canonical state. The intended
consistency tools are immutable transition events, preconditions and
postconditions, idempotency keys, compensating events, and explicit uncertainty
states.

This is an architectural contract. No code under `src/` enforces it today.

## Components and boundaries

### Specification layer

The specification layer is the strongest and most coherent part of the
repository:

- [`memory/constitution.md`](../../memory/constitution.md) defines six design
  invariants;
- [`specs/core-system/spec.md`](../../specs/core-system/spec.md) defines the
  canonical entities, subsystems, normal flow, and degenerate states;
- [`specs/features/state-authority/`](../../specs/features/state-authority/)
  expands transition rules, contracts, error codes, and the proposed data
  model;
- [`specs/features/weekly-cycle-flow/`](../../specs/features/weekly-cycle-flow/)
  specifies scheduling through closeout;
- [`specs/features/pilot-mvp/`](../../specs/features/pilot-mvp/) specifies a
  25-user manual pilot and leaves its execution tasks unchecked;
- [`specs/economics/`](../../specs/economics/) defines the unit of analysis,
  cost model, sensitivity questions, and economic kill conditions.

### External-platform setup layer

[`implementation/airtable/`](../../implementation/airtable/) describes 17
tables across three planned phases. It includes synthetic test records and six
scripts:

- `log-garment-transition.js`
- `enforce-lifecycle-bounds.js`
- `auto-schedule-cycles.js`
- `auto-commit-cycles.js`
- `auto-progress-wear-window.js`
- `check-overdue-returns.js`

The scripts encode meaningful workflow logic, but their boundary matters. They
depend on Airtable's hosted execution environment and exact field/table
configuration. They are not imported by the Node package, do not have an
included mock of the Airtable API, and have no automated integration suite. The
transition logger also documents that Airtable automation does not natively
provide the previous value; without an additional stored value or API history,
its `from_state` can be `Unknown`. That is a material gap relative to the
specified audit model.

[`implementation/retool/`](../../implementation/retool/) is prose-level build
instruction rather than application source. Page names and query shapes are
specified, but no executable Retool artifact is versioned here.

### Local TypeScript layer

The local package exposes:

```text
src/index.ts
├── SubscriptionManager / SubscriptionTier
└── ProductCatalog
```

`SubscriptionManager` stores generic subscription records in an in-memory
`Map`. `ProductCatalog` stores generic products in another in-memory `Map` and
supports search and filters. There is no persistence, network interface, user
authentication, authorization, telemetry, or domain event stream.

## Specified data flow and interfaces

The intended weekly flow is:

1. derive a `WEEK_ID` from the user's anchor;
2. create a `CycleEntity` in `Scheduled`;
3. obtain a fit proposal and filter it against inventory and timing;
4. commit the cycle only after eligibility and feasibility checks;
5. bind and scan garments into a box;
6. translate external carrier signals into canonical internal transitions;
7. open wear and return windows by policy;
8. receive and inspect the returned assets;
9. update lifecycle counters and fit beliefs;
10. settle and close the cycle through immutable history.

Carrier, payment, identity, cleaning, repair, and communication providers are
specified as non-authoritative external actors. Concrete provider interfaces,
authentication methods, schemas, retry budgets, and reconciliation jobs are
not implemented.

## Dependencies and requirements

The local package declares only development tooling: TypeScript, Vitest, ESLint,
`typescript-eslint`, and coverage tooling. It targets ES2022 modules and has no
runtime dependency.

The proposed pilot additionally requires resources not provisioned in this
repository: Airtable, Retool, email access, barcode or camera scanning, physical
inventory and boxes, a cleaning/refurbishment workflow, a carrier workflow,
payment handling, and trained operators.

## Install, build, and test

As verified on 2026-08-31, a normal clean install is currently blocked:

```bash
npm ci
```

`typescript@7.0.2` is outside the `<6.1.0` peer range accepted by
`typescript-eslint@8.67.0`. Installing with the explicit compatibility bypass
allows the TypeScript compiler and tests to run, but ESLint still rejects the
TypeScript version:

```bash
npm ci --legacy-peer-deps
npm run lint       # passes: tsc --noEmit
npm run build      # passes
npm test           # passes: 3 files, 16 tests
npm run lint:eslint # fails: typescript-eslint does not support TS 7.0
```

These checks validate the generic in-memory TypeScript scaffold only. They do
not validate the Airtable scripts, Retool setup, system specifications, or a
weekly garment cycle.

## Observability and failure modes

The design gives observability first-class status: entity histories,
idempotency keys, exception queues, custody uncertainty, lifecycle counters,
and explicit recovery paths are specified. Proposed operational metrics include
on-time dispatch, cycle slip, shrink, state mismatch, cleaning turnaround,
exception age, support contacts, and contribution margin.

No runtime telemetry, logs, dashboards, alert rules, traces, or metric exports
exist in the repository. The Retool dashboards are build instructions. The
operational metrics are measurement contracts, not collected data.

The most important specified failure loops are:

- inventory shortage before commitment;
- packing variance or mispack;
- missing or contradictory delivery signals;
- late returns that starve the next cycle;
- damage, contamination, or safety quarantine;
- payment failure;
- divergence between physical custody and recorded state.

## Security and human-approval boundaries

The specifications refer to user identity, shipping address, payment state,
carrier events, and fit information. The seed users are visibly synthetic, but
the repository does not define a complete privacy, retention, encryption,
access-control, breach-response, or threat model. Payment integration, legal
agreements, insurance, and detailed safety/hygiene protocols remain documented
roadmap gaps.

The proposed pilot deliberately keeps fit allocation, garment-condition grading,
communications, exception resolution, and final launch approval human-led.
Those are designed human-approval boundaries, not implemented permission
controls.

## Known technical debt

- No executable implementation of the canonical domain architecture.
- No Airtable or Retool export and no local integration harness.
- TypeScript scaffold semantics drift from the apparel/cycle specification.
- Standard `npm ci` and ESLint are broken by a peer-version conflict.
- The event-logging script cannot guarantee a known prior state as written.
- No end-to-end, property, state-machine, security, load, or recovery tests.
- No concrete payment, carrier, identity, cleaning, or communication adapter.
- No production data model, migrations, API contract, or persistence layer.
- No runtime observability or deployment receipt.

## Inspection paths

- [Canonical project record](../../project-record.yml)
- [Claim-level evidence record](../evidence/README.md)
- [Implementation tracker](../../implementation/IMPLEMENTATION-STATUS.md)
- [Roadmap and known gaps](../../roadmap/THERE-AND-BACK-AGAIN.md)
- [Canonical README](../../README.md)
