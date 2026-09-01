[![ORGAN-III: Ergon](https://img.shields.io/badge/ORGAN--III-Ergon-1b5e20?style=flat-square)](https://github.com/organvm-iii-ergon)
[![Status: Design only](https://img.shields.io/badge/Status-Design%20only-lightgrey?style=flat-square)](project-record.yml)
[![Documentation: Class A](https://img.shields.io/badge/Documentation-Class%20A-5c6ac4?style=flat-square)](docs/README.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![CI](https://github.com/4444J99/your-fit-tailored/actions/workflows/ci.yml/badge.svg)](https://github.com/4444J99/your-fit-tailored/actions/workflows/ci.yml)

# Your-Fit-Tailored

> A design and implementation-planning record for a proposed weekly clothing service that would circulate garments, learn fit over time, and remove routine shopping decisions.

[Published documentation](https://4444j99.github.io/your-fit-tailored/) ·
[Two-minute explanation](docs/audiences/general.md) ·
[Technical edition](docs/audiences/technical.md) ·
[Humanities edition](docs/audiences/humanities.md) ·
[Operational edition](docs/audiences/business.md) ·
[Evaluation record](docs/audiences/evaluator.md) ·
[Claim-level evidence](docs/evidence/README.md)

## What am I looking at?

This is the source repository and documented project record for
Your-Fit-Tailored. A repository is the organized collection of writing, code,
design decisions, examples, tests, and revision history used to define and
inspect a project.

The intended service is not running here. The repository records the proposed
system, its operating model, its economics, setup instructions for an Airtable
and Retool pilot, and a small TypeScript package. It does **not** contain
evidence of a configured platform, an executed pilot, active users, or business
outcomes. The roadmap places the project at the end of Epoch 0: conception and
specification.

> *Part of the [ORGAN-III: Ergon](https://github.com/organvm-iii-ergon) commerce organ — products, services, and revenue-generating systems within the [organvm](https://github.com/meta-organvm) creative-institutional ecosystem.*

## Choose your reading path

| I am reading as… | Start here |
|---|---|
| A general reader | [What the project proposes, in two minutes](docs/audiences/general.md) |
| A software engineer | [Architecture, executable code, tests, and gaps](docs/audiences/technical.md) |
| A humanities scholar or artist | [Dress, agency, memory, and circular time](docs/audiences/humanities.md) |
| An operator, founder, or industry practitioner | [Proposed workflow, requirements, and risks](docs/audiences/business.md) |
| A hiring manager, collaborator, or evaluator | [Contribution boundaries and inspection map](docs/audiences/evaluator.md) |

## Project at a glance

| | |
|---|---|
| **What it is** | A specification corpus, operating model, setup package, and limited code scaffold for a proposed circular weekly apparel subscription service. |
| **Problem addressed** | The design asks whether fit learning and closed-loop logistics can reduce clothing-related decision load without losing operational state truth. |
| **Current state** | **Design only.** Specifications and setup artifacts exist; the foundation build, live pilot, and operational runtime are not evidenced in this repository. |
| **Intended users** | Future subscribers and pilot operators. No current user cohort is evidenced. |
| **What Anthony built** | Project framing, system and operating design, repository implementation artifacts, public documentation, CI, and maintenance. Initial commits explicitly credit Claude Opus 4.5 as a co-author; Git history does not support sole line-by-line authorship claims. |
| **Inspectable evidence** | Specifications, setup guides, seed data, six Airtable-targeted scripts, operational checklists, unit-economics workbooks, Git history, and 16 passing tests for a separate generic TypeScript scaffold. |
| **Known limitations** | No configured Airtable or Retool environment, no service runtime, no completed end-to-end pilot test, no user or outcome data, and no implemented fit/state/logistics platform in `src/`. Standard dependency installation and ESLint are also currently blocked by a TypeScript/tooling peer-version conflict. |

The machine-readable factual substrate is [`project-record.yml`](project-record.yml).
Material public claims and their boundaries are listed in the
[`evidence record`](docs/evidence/README.md).

## Canonical project documentation

The remainder of this README preserves the long-form design argument. Unless a
passage explicitly says otherwise, descriptions of platform behavior are
specifications for a future implementation, not reports of a deployed service.

## Table of Contents

- [What am I looking at?](#what-am-i-looking-at)
- [Choose your reading path](#choose-your-reading-path)
- [Project at a glance](#project-at-a-glance)
- [Canonical project documentation](#canonical-project-documentation)
- [The Problem](#the-problem)
- [The Approach](#the-approach)
- [Constitutional Invariants](#constitutional-invariants)
- [Architecture](#architecture)
- [Domain Model](#domain-model)
- [System Subsystems](#system-subsystems)
- [State Machines](#state-machines)
- [Unit Economics Model](#unit-economics-model)
- [Implementation Stack](#implementation-stack)
- [Repository Structure](#repository-structure)
- [Installation and Quick Start](#installation-and-quick-start)
- [Specified capabilities and pilot hypotheses](#specified-capabilities-and-pilot-hypotheses)
- [Roadmap: The Five Epochs](#roadmap-the-five-epochs)
- [Cross-Organ References](#cross-organ-references)
- [Related Work](#related-work)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)
- [Author](#author)

---

## The Problem

The project frames traditional clothing consumption as a source of compounding cognitive debt across four dimensions. These are design premises to test, not findings from a user study in this repository:

- **Decision fatigue.** "I have nothing to wear" despite full closets. The paradox of choice compounds weekly as wardrobes grow but satisfaction does not. Every shopping session demands style evaluation, size guessing, price comparison, and return-risk calculation. The cognitive cost is invisible but cumulative.

- **Shopping anxiety.** Overwhelming choice, uncertain fit, buyer's remorse. Online ordering amplifies uncertainty — sizing varies across brands, photographs misrepresent texture and drape, and return logistics impose their own friction. Users spend mental energy on acquisition rather than experience.

- **Wardrobe guilt.** Unused garments can accumulate while money, material, and storage remain committed to clothing that is rarely worn. The repository treats this as a design premise; it does not contain a study establishing a universal utilization rate.

- **Body confidence concerns.** Fit uncertainty amplified by online ordering. Bodies change — weight fluctuates, preferences drift, seasons shift needs. Static sizing captured once at purchase time fails to track these changes, leading to closets full of garments that almost fit.

The resulting design thesis is: the intended user does not want more clothing decisions; they want to look good without repeatedly managing the process.

---

## The Approach

Your-Fit-Tailored reframes apparel consumption as a **temporal service** optimized for continuity, correctness of state, and stable weekly fulfillment. The repository uses a specification-first methodology in which design decisions flow from six constitutional invariants and downstream artifacts — from proposed database schema to operator SOP — are intended to trace back to formal requirements.

### Specification-First Development

The domain-design corpus follows a specification-driven development (SDD) methodology. Theoretical foundations precede architecture; architecture precedes implementation; implementation would precede deployment. The intended rule is that a domain artifact should resolve to a formal statement of what must be true. This sequence is designed to keep requirements and violations inspectable across later vendor, tooling, and team decisions. The separate generic TypeScript scaffold does not yet satisfy that traceability contract for the proposed platform.

The specification corpus includes:

- **Theoretical foundation** — First-principles definition of the system boundary, entity ontology, and verification criteria.
- **Formal system architecture** — Canonical data model, subsystem decomposition, event flows, and degenerate state analysis.
- **Unit economics simulation** — Per-cycle marginal cost model with sensitivity analysis across scale.
- **Pilot operational playbook** — Day-to-day procedures, fallback protocols, and graduation criteria for a 25-user validation cohort.
- **Feature specifications** — Acceptance scenarios, edge cases, and measurable success criteria for each subsystem.

### Circular Economy Model

```
┌─────────┐    ┌──────────┐    ┌──────────┐    ┌─────────────┐
│  Ship   │───>│   Wear   │───>│  Return  │───>│  Refurbish  │──┐
└─────────┘    └──────────┘    └──────────┘    └─────────────┘  │
     ^                                                          │
     └──────────────────────────────────────────────────────────┘
```

In the proposed service, garments circulate and learning is intended to compound. Users would not browse or accumulate the circulated garments. Each completed cycle would feed the next: returns generate fit data; fit data could improve allocation; improved allocation could support satisfaction and retention; retained revenue could fund more inventory. These are causal hypotheses encoded in the design, not observed results from a pilot.

---

## Constitutional Invariants

All design decisions flow from six non-negotiable invariants established in `memory/constitution.md`. These govern the system regardless of implementation choices, vendor selections, or operational constraints. Any downstream design — whether technical architecture, warehouse layout, or pricing model — must satisfy the cross-cutting verification question:

> *Does this choice reduce uncertainty, friction, or variance across cycles without increasing cognitive load on the user? If not, it violates the constitution.*

| # | Invariant | Statement | Violation |
|---|-----------|-----------|-----------|
| 1 | **Weekly Cadence** | 7-day cycles are non-negotiable; exceptions close with recovery, never skip. | Any silent delay, implicit skip, or cadence drift not recorded as an explicit compensating event. |
| 2 | **Circular Inventory** | Garments are stateful assets with lifecycle bounds; inventory is closed-loop. | Double-allocation, phantom inventory, garments returning to circulation without inspection. |
| 3 | **State Truth Discipline** | All entities auditable; single subsystem owns each state class. | Split-brain state, external systems treated as authoritative, in-place mutation instead of compensating events. |
| 4 | **Explicit Failure Handling** | Failures are normal; recovery paths are first-class, not exceptions. | Silent failures, unclassified exceptions, ad hoc operational interventions. |
| 5 | **Probabilistic Fit** | Fit is a belief distribution that evolves, not static measurement. | Deterministic fit matching, ignoring uncertainty, requiring explicit user feedback. |
| 6 | **Cognitive Load Minimization** | System defaults for all routine decisions; user input optional. | Requiring users to make routine decisions, exposing internal state complexity. |

Theoretical failure occurs not when a user dislikes an outfit, but when the user feels required to manage the system. Trust is modeled as a lagging indicator — once broken, it decays faster than it can be rebuilt.

---

## Architecture

This section describes the canonical **specified architecture**. The six
subsystems and their event-sourced state model are not implemented by the
current TypeScript modules in `src/`.

### System Boundary

The proposed platform is bounded as a temporal service. Its components would be evaluated on throughput, latency, error recovery, and lifecycle yield. The designed system begins at user onboarding and terminates only at account closure, with no concept of a "completed purchase." This boundary explicitly excludes one-time retail transactions, user-initiated browsing, and static ownership models.

### Architectural Principles

The architecture is organized around four principles derived from the constitutional invariants:

1. **Event-sourced state management.** Every state transition is recorded as an immutable event with timestamp, actor, preconditions, and outcome. Entity state at any point in time can be reconstructed by replaying the event log. This provides complete auditability and supports debugging, reconciliation, and regulatory compliance.

2. **Transition contract enforcement.** Each valid state transition has defined preconditions that must be true before the transition and postconditions guaranteed after. Invalid transitions are rejected with specific error codes. Partial transitions are impossible — either the event is recorded and state changes, or neither happens.

3. **Single-authority ownership.** Exactly one subsystem is authoritative for each class of state. External signals (carriers, payment processors, cleaning facilities) are inputs that must be validated, reconciled, and translated. The platform never delegates canonical state transitions to external actors.

4. **Idempotent operations.** All transition operations are idempotent — replaying the same request with the same idempotency key has no additional effect. This enables safe retries in distributed environments and simplifies error recovery.

---

## Domain Model

The system resolves into four primary entity classes. No entity is static. All entities accumulate state with each cycle, and the system's intelligence emerges from the interactions between these evolving states.

### Core Entities

| Entity | Definition | Key Characteristic |
|--------|------------|-------------------|
| **UserEntity** | Contract-bearing participant with evolving fit profile | Probabilistic fit-state vector, not demographics. States: Active, Paused, HoldPayment, HoldIdentity, HoldLogistics, Closed. |
| **GarmentEntity** | Reusable physical asset with lifecycle bounds | Stateful degradation, hygiene history, fit-performance metadata. 14 states from Available through Disposed. |
| **BoxEntity** | Transient container binding outbound/inbound states | Logistics commitment for a cycle. Tracks planned vs. actual contents with packing variance detection. |
| **CycleEntity** | Atomic unit of value creation | One outbound wear period + one inbound recovery period. Deterministic state progression across 11 states. |

### Identifier Conventions

All identifiers are tenant- and time-scoped using named placeholders for multi-tenant isolation:

- `TENANT_ID` — Multi-tenant isolation boundary
- `USER_ID` — User identity within tenant
- `GARMENT_ID` — Physical asset tracking (barcode-linked)
- `BOX_ID` — Container tracking (barcode-linked)
- `CYCLE_ID` — Temporal contract instance
- `WEEK_ID` — Derived from user anchor and platform calendar

### Entity Relationships

A single weekly cycle binds one user to one box containing multiple garments. The cycle entity is the atomic unit of value creation — it represents the complete round-trip from box induction through outbound shipping, wear period, return, inspection, and garment requalification. Garments flow through cycles but persist across them, accumulating lifecycle counters (wear_count, wash_count, repair_count) and condition grades that inform retirement decisions.

---

## System Subsystems

The specified architecture decomposes into seven logical subsystems, each owning a distinct class of responsibility. These are design boundaries, not deployed services:

### StateAuthoritySubsystem

The canonical source of truth for all entity state and transitions. No other subsystem may mutate entity state directly. All state changes flow through State Authority, which validates transitions, enforces invariants, and emits events that downstream systems consume. This subsystem enforces single-assignment constraints (a garment cannot be reserved for multiple cycles), weekly uniqueness (at most one open cycle per user per week), and lifecycle bounds (garments exceeding configured usage limits automatically retire).

### FitIntelligenceSubsystem

Manages probabilistic fit modeling. Fit confidence is modeled as a rolling posterior probability, not a deterministic match. The system assumes that bodies fluctuate, preferences drift, and garments respond differently across repeated wears. Each cycle increases fit certainty or reduces uncertainty. Both explicit user signals and implicit behavioral signals inform fit beliefs. UserFitBelief includes a DriftModel for gradual body changes; GarmentFitBelief includes an AgingModel for repeated refurbishment effects. Explicit user feedback is treated as optional — the system must function without it.

### LogisticsOrchestrationSubsystem

Coordinates the weekly cadence across scheduling, commitment, fulfillment, shipping, delivery confirmation, return initiation, and inbound processing. Manages carrier integrations, bounded uncertainty states when external signals conflict, and the temporal contracts that keep the weekly rhythm intact.

### InventoryLifecycleSubsystem

Governs garment utilization density — maximizing wears per garment per unit time without degrading perceived freshness or hygiene confidence. Manages rotation logic, garment rest periods, visual differentiation, and planned extraction of residual value through defined exit paths (resale, donation, recycling, downcycling). Every garment exit path is defined at the moment of inventory intake.

### ExperienceMinimizationSubsystem

Defines which decisions are optional and what defaults apply. Responsible for ensuring user cognitive load asymptotically approaches zero. The user-facing state model is an intentionally simplified projection of the canonical state — users never need to understand the internal state machine.

### ContractEnforcementSubsystem

Manages user eligibility through operational holds (HoldPayment, HoldLogistics, HoldIdentity) that gate cycle commitment without corrupting historical state. Handles settlement computation, exception escalation, and the boundary between normal operations and intervention-required scenarios.

### ObservabilityAuditRecoverySubsystem

Specifies traceability from an outcome back to events, decisions, and state transitions. It defines anomaly detection and controlled repair flows that preserve history while correcting current state. No runtime telemetry or recovery service is implemented in this repository.

---

## State Machines

### Garment Lifecycle

```
Available -> Reserved -> Packed -> InTransitOutbound -> Delivered
    ^                                                      |
    |                                                      v
    |                                                    InUse
    |                                                      |
    |                                                      v
    +-- Refurbish <-- ReceivedReturn <-- InTransitReturn <-+
    |
    +-- Repair --> Available (or Retired)
    |
    +-- Quarantine --> Disposed
    |
    +-- Retired --> Disposed
    |
    +-- Lost (terminal)
```

Each garment carries lifecycle counters (wear_count, wash_count, repair_count) and a condition_grade. When lifecycle bounds are exceeded during a cycle, the garment completes the current cycle normally and then transitions to Retired instead of Available at closeout.

### Cycle Progression

```
Scheduled -> Committed -> FulfillmentInProgress -> OutboundInTransit
    -> Delivered -> WearWindowOpen -> ReturnWindowOpen
    -> ReturnInTransit -> CloseoutInspection -> Settled -> Closed
```

Each stage has defined preconditions and postconditions. A cycle cannot advance without all preconditions being met. The system enforces exactly one open cycle per user per week — duplicate cycle creation is rejected at the State Authority level.

---

## Unit Economics Model

The economic model defines revenue as subscription time rather than garments shipped. It models labor, cleaning, and logistics variance as major costs rather than relying on traditional retail COGS alone. Its canonical unit of analysis is one **User-Week Cycle** — a successfully fulfilled weekly service interval for one active user.

### Per-Cycle Cost Components

| Category | Components | Driver |
|----------|-----------|--------|
| **Garment Service** | Cleaning + QA per garment per cycle | Items per box x service cost |
| **Logistics** | Outbound shipping + return shipping per box | Carrier rates, box weight |
| **Labor** | Pick-pack + inbound processing per box | Warehouse throughput |
| **Inventory Replacement** | Loss + damage + lifecycle retirement | Probability distributions |
| **Variance Costs** | Mis-ship recovery + late return handling | Error rates, exception labor |
| **Payment Processing** | Processor fees per transaction | Revenue percentage + fixed fee |
| **Customer Support** | Variable support per user-week | Contact rate driven by errors |

### Inventory Capital Requirement

The model requires an **inventory multiple** — effective garments per active user — calculated as:

```
INVENTORY_MULTIPLE = ITEMS_PER_BOX * TOTAL_CYCLE_TIME_WEEKS * SAFETY_STOCK_FACTOR
```

Where `TOTAL_CYCLE_TIME_WEEKS` includes return latency plus cleaning/QA turnaround time, and `SAFETY_STOCK_FACTOR` is a multiplicative buffer for variance (late returns, rewash, rework, mis-sorts). The inventory multiple determines working capital requirements and directly gates scaling speed.

### Viability Condition

The model is economically viable only if the marginal cost of an additional cycle decreases over time through learning effects, routing optimization, and inventory reuse. If marginal cost remains flat or increases with scale, the model collapses. The unit economics simulation spreadsheet (`assets/Circular_Subscription_Unit_Economics_Simulator_Advanced.xlsx`) provides scenario analysis across 100 to 100,000 users with sensitivity to key variance drivers.

---

## Implementation Stack

The planned pilot build targets a no-code stack optimized for speed-to-validation, not production scale. The repository contains setup guides, seed data, and scripts for this stack; it does not contain exports or other evidence that the Airtable base or Retool applications were configured:

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Database** | Airtable | 17 tables across 3 phases (State Authority, Weekly Cycle Flow, Pilot MVP) |
| **Admin UI** | Retool | 20 pages across AdminConsole and WarehouseOps applications |
| **Automations** | Airtable Automations (JavaScript) | 6 automations for scheduling, commitment, window progression, overdue checking, event logging, lifecycle enforcement |
| **Communications** | Manual (email templates) | 6 templated communications for cycle lifecycle touchpoints |
| **Analytics** | Data export + spreadsheet | Pilot metrics computed from Airtable exports |

### Automation Scripts

The repository contains six JavaScript automation scripts designed to run within Airtable's automation environment. They have no local integration harness and are not evidenced as deployed:

| Script | Trigger | Purpose |
|--------|---------|---------|
| `log-garment-transition.js` | Garment state change | Emit immutable event to Events table |
| `enforce-lifecycle-bounds.js` | Garment received return | Check lifecycle counters, route to Retired if exceeded |
| `auto-schedule-cycles.js` | Sunday 6 PM | Create Scheduled cycles for all Active users |
| `auto-commit-cycles.js` | Daily 6 AM | Commit cycles where all feasibility checks pass |
| `auto-progress-wear-window.js` | Hourly | Transition cycle states based on time windows |
| `check-overdue-returns.js` | Daily 9 AM | Flag overdue returns, escalate per SOP |

---

## Repository Structure

```
your-fit-tailored/
├── README.md                          # This document
├── CLAUDE.md                          # AI assistant context
│
├── memory/                            # Constitutional invariants
│   └── constitution.md                # 6 non-negotiable truths governing all design
│
├── specs/                             # Formal specifications
│   ├── core-system/                   # System architecture and theoretical foundation
│   │   ├── spec.md                    # Formal system architecture specification
│   │   └── theoretical-foundation.md  # First-principles theoretical layer
│   ├── economics/                     # Business model and unit economics
│   │   ├── business-model.md          # Full business model analysis with citations
│   │   ├── integrated-spec.md         # Integrated economic specification
│   │   └── simulator-model.md         # Simulation model with pseudocode formulas
│   ├── features/                      # Feature specifications (SDD methodology)
│   │   ├── pilot-mvp/                 # 25-user pilot integration specification
│   │   ├── state-authority/           # State machine and transition contract spec
│   │   └── weekly-cycle-flow/         # Weekly cadence orchestration spec
│   └── pilot-ops/                     # Pilot operational playbook
│       └── playbook.md                # SOPs, metrics, graduation criteria
│
├── implementation/                    # Build artifacts (Airtable + Retool)
│   ├── IMPLEMENTATION-STATUS.md       # Execution tracking across 3 phases
│   ├── airtable/                      # Database schemas, seed data, automations
│   │   ├── SETUP-GUIDE.md             # State Authority tables (8 tables)
│   │   ├── seed-data/                 # CSV seed data for pilot
│   │   ├── automations/               # JavaScript automation scripts
│   │   ├── weekly-cycle-flow/         # Orchestration tables + automations
│   │   └── pilot-mvp/                 # Pilot-specific tables + schemas
│   ├── retool/                        # Admin UI specifications
│   │   ├── SETUP-GUIDE.md             # Core pages (7 pages)
│   │   ├── weekly-cycle-flow/         # Workflow pages (7 pages)
│   │   └── pilot-mvp/                 # Pilot pages (6 pages)
│   └── pilot-ops/                     # Operational materials
│       ├── email-templates.md         # 6 communication templates
│       ├── launch-checklist.md        # Pre-launch verification checklist
│       └── operator-sops.md           # Standard operating procedures
│
├── roadmap/                           # Project trajectory
│   └── THERE-AND-BACK-AGAIN.md        # 5-epoch journey from conception to scale
│
├── analysis/                          # Project evaluations
│   └── evaluation-to-growth-report.md # Comprehensive project analysis
│
├── research/                          # AI research prompts (meta-prompts)
├── origin/                            # Project origin transcript
└── assets/                            # Supporting files
    ├── Circular_Subscription_Unit_Economics_Simulator.xlsx
    └── Circular_Subscription_Unit_Economics_Simulator_Advanced.xlsx
```

---

## Installation and Quick Start

This is a **specification-first repository**. There is no runtime application to install. The repository contains formal specifications, implementation artifacts, and operational materials for building and operating a circular weekly apparel subscription platform.

### Understanding the System (30 minutes)

1. **Read the constitution.** Start with `memory/constitution.md` — the six invariants that govern all design decisions. Every specification, implementation choice, and operational procedure traces back to these truths.

2. **Review the roadmap.** `roadmap/THERE-AND-BACK-AGAIN.md` explains the five-epoch journey from conception through pilot validation to sustained operation. Understand where the project is and where it is going.

3. **Explore the theoretical foundation.** `specs/core-system/theoretical-foundation.md` defines the system boundary, entity ontology, and verification criteria at the first-principles level.

### Deep Dive (2 hours)

4. **Study the system architecture.** `specs/core-system/spec.md` contains the formal system architecture specification — canonical data model, subsystem decomposition, event flows for a complete cycle, and degenerate state analysis.

5. **Understand the economics.** `specs/economics/business-model.md` provides the full business model analysis with unit economics, sensitivity analysis, and economic kill conditions. The companion spreadsheets in `assets/` provide interactive simulation.

6. **Read the feature specifications.** Start with `specs/features/state-authority/spec.md` (the foundational subsystem), then `specs/features/weekly-cycle-flow/spec.md` (the cadence engine), then `specs/features/pilot-mvp/spec.md` (the integration layer).

### Building the Pilot (roadmap estimate: 3 weeks)

7. **Follow the implementation guides.** The `implementation/` directory contains step-by-step setup guides for Airtable and Retool, organized in three phases. The three-week sequence below is a planning estimate from `implementation/IMPLEMENTATION-STATUS.md`, not a measured delivery time:
   - **Week 1:** Airtable foundation (8-12 hours) — State Authority tables, Weekly Cycle Flow tables, Pilot MVP tables, automations.
   - **Week 2:** Retool build (12-16 hours) — Core pages, workflow pages, pilot pages across AdminConsole and WarehouseOps apps.
   - **Week 3:** Validation (4-6 hours) — End-to-end testing, operator training, launch readiness.

8. **Execute the launch checklist.** `implementation/pilot-ops/launch-checklist.md` provides the final verification steps before accepting live users.

---

## Specified capabilities and pilot hypotheses

The capabilities below are specified or represented by setup artifacts. They
are not implemented by the current TypeScript package and have not been
validated in a live pilot.

### Pilot MVP (25 Users)

The proposed pilot is designed to test four hypotheses simultaneously:

| Hypothesis | Metric | Target |
|-----------|--------|--------|
| Users value continuous apparel with zero cognitive load | NPS-like score | > 30 |
| Unit economics support scaling | Contribution margin per user-week | Non-negative |
| Weekly cycles can be executed reliably | On-time dispatch percentage | > 90% |
| Probabilistic allocation produces acceptable fit | First-cycle fit satisfaction | > 80% |

### Proposed core capabilities

- **State Authority** — Canonical entity state management with transition contracts, event sourcing, and full audit trail. Enforces single-assignment constraints, weekly uniqueness, and lifecycle bounds. Zero tolerance for double-allocation or phantom inventory.

- **Weekly Cycle Flow** — Automated scheduling (Sunday), commitment (daily), wear window progression (hourly), and overdue return detection (daily). Deterministic state progression across 11 cycle states with explicit recovery paths for every failure mode.

- **Fit Intelligence (Manual for Pilot)** — Operator-driven allocation based on fit profiles with structured feedback capture. Prepares data pipeline for automated probabilistic fit modeling at scale.

- **Packing Variance Detection** — Scan-based verification that actual box contents match planned contents. Mismatches recorded as compensating events with explicit resolution workflows, ensuring fit intelligence receives accurate observed data.

- **Exception Recovery** — Six categorized failure types (inventory shortage, packing variance, delivery signal missing, late return, damage/contamination, payment failure), each with defined resolution paths and escalation procedures.

- **Operational Dashboards** — 20 Retool pages across two applications (AdminConsole and WarehouseOps) providing real-time visibility into cycle state, inventory health, scheduling jobs, exception queues, and pilot metrics.

### Pilot Graduation Criteria

| Decision | Criteria |
|----------|----------|
| **Graduate** | Cadence on-time > 90%, shrink < 5%, contribution margin non-negative, NPS > 30 |
| **Pivot** | Cadence feasible but economics or product shape needs change |
| **Shutdown** | Cannot maintain cadence, shrink exceeds bounds, value proposition failure |

---

## Roadmap: The Five Epochs

The project follows a five-epoch journey where each epoch builds on what the previous learned. The metaphor is "there and back again" — garments go out and come back, learning goes out and comes back, and the business model itself follows the same circular pattern.

| Epoch | Name | Duration | Users | Primary Question | Status |
|-------|------|----------|-------|------------------|--------|
| 0 | Conception | Complete | 0 | What are we building? | Repository records specification set as complete |
| 1 | Foundation Build | 3 weeks | 0 | Can we build the MVP? | Ready to execute |
| 2 | Pilot Validation | 8-12 weeks | 25 | Does this work? | Next phase |
| 3 | Intelligence Maturation | 12-24 weeks | 250 | Can we learn fast enough? | Post-pilot |
| 4 | Controlled Scaling | 24-52 weeks | 2,500 | Can we grow profitably? | Future |
| 5 | Sustained Operation | Ongoing | 2,500+ | Can we compound value? | Future |

**Current milestone:** End of Epoch 0. The planned specification and setup-artifact set is present. No independent review approval is recorded. The foundation build remains unexecuted in the available evidence.

---

## Cross-Organ References

Your-Fit-Tailored sits within [ORGAN-III: Ergon](https://github.com/organvm-iii-ergon), the commerce organ of the organvm ecosystem. It connects to the broader system through several channels:

- **ORGAN-I: Theoria** ([organvm-i-theoria](https://github.com/organvm-i-theoria)) — The constitutional invariant methodology and specification-driven development approach used throughout this project are grounded in the epistemological and recursive systems work housed in ORGAN-I. The concept of "constitutional invariants" as non-negotiable truths governing all design is a direct application of ORGAN-I's ontological framework.

- **ORGAN-II: Poiesis** ([organvm-ii-poiesis](https://github.com/organvm-ii-poiesis)) — The generative and experiential design principles that inform the user experience contract — where theoretical failure is defined as the user feeling required to manage the system — draw from the art organ's work on experience design and cognitive aesthetics.

- **ORGAN-IV: Taxis** ([organvm-iv-taxis](https://github.com/organvm-iv-taxis)) — The state machine architecture and event-sourced governance model align with ORGAN-IV's orchestration patterns. The State Authority subsystem's approach to single-authority ownership and transition contract enforcement reflects ORGAN-IV's broader governance philosophy.

- **ORGAN-V: Logos** ([organvm-v-logos](https://github.com/organvm-v-logos)) — The specification-first methodology and the project's extensive documentation corpus make it a candidate for public process essays on building circular commerce systems from first principles.

---

## Related Work

The design positions Your-Fit-Tailored against several apparel-service categories. The comparisons below record the repository's positioning argument; they are not a current, independently verified market survey:

- **Styling services** are treated as purchase-oriented curation: garments are acquired rather than continuously circulated, and the user generally makes a keep-or-return decision.

- **Rental platforms** are treated as circulation systems that usually retain user-led browsing and selection rather than making a fixed weekly cadence the system invariant.

- **Subscription boxes** are treated as recurring delivery systems that may sell products rather than operate a closed-loop asset fleet.

The proposed distinction is the combination of weekly cadence (a control-system constraint), circular inventory (fleet economics), probabilistic fit (belief distributions), and constitutional-invariant-driven design. The model treats garments as stateful production assets intended to generate recurring value through utilization density rather than point-of-sale margin. Whether this distinction is commercially viable remains untested.

---

## Contributing

This repository is currently in a **design-only, pre-foundation-build phase**. The planned specifications and setup artifacts are present, but pilot readiness has not been demonstrated. Contributions are welcome in the following areas:

1. **Specification review.** The formal specs in `specs/` benefit from domain expertise in subscription commerce, reverse logistics, circular economy operations, and probabilistic modeling. File issues for invariant violations, economic model gaps, or operational blind spots.

2. **Implementation execution.** The `implementation/` directory contains complete setup guides for building the pilot on Airtable + Retool. Follow the guides and report discrepancies between specification and reality.

3. **Pilot operations.** Once the pilot launches, operational learning is the primary value creation activity. Exception documentation, process improvement suggestions, and metrics analysis are all valuable contributions.

Please read `memory/constitution.md` before contributing. All contributions must satisfy the cross-cutting verification question: *Does this choice reduce uncertainty, friction, or variance across cycles without increasing cognitive load on the user?*

---

## Contact

For questions, feedback, or contributions related to Your-Fit-Tailored, reach out via [GitHub](https://github.com/4444J99).

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Author

**[@4444j99](https://github.com/4444j99)**

Builder of systems that compound. Your-Fit-Tailored is one expression of a broader creative-institutional practice spanning theory, art, commerce, and public process — coordinated through the [organvm](https://github.com/meta-organvm) ecosystem.

---

*Status last verified against repository evidence: 2026-08-31*
