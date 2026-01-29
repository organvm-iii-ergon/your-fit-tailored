# Your-Fit-Tailored

> A temporal service delivering continuous, low-friction apparel experiences through circular weekly subscription.

---

## The Problem

Traditional clothing consumption creates compounding cognitive debt:

- **Decision fatigue** — "I have nothing to wear" despite full closets
- **Shopping anxiety** — Overwhelming choice, uncertain fit, buyer's remorse
- **Wardrobe guilt** — Unused garments accumulate, money wasted
- **Body confidence concerns** — Fit uncertainty amplified by online ordering

Users don't want more clothes. They want to look good without thinking about it.

---

## The Approach

Your-Fit-Tailored is **not a marketplace**. It's a **temporal service** optimized for continuity, correctness of state, and stable weekly fulfillment.

### Specification-First Development

Every design decision flows from 6 constitutional invariants:

| # | Invariant | Meaning |
|---|-----------|---------|
| 1 | **Weekly Cadence** | 7-day cycles are non-negotiable; exceptions close with recovery, never skip |
| 2 | **Circular Inventory** | Garments are stateful assets with lifecycle bounds; inventory is closed-loop |
| 3 | **State Truth Discipline** | All entities auditable; single subsystem owns each state class |
| 4 | **Explicit Failure Handling** | Failures are normal; recovery paths are first-class, not exceptions |
| 5 | **Probabilistic Fit** | Fit is a belief distribution that evolves, not static measurement |
| 6 | **Cognitive Load Minimization** | System defaults for all routine decisions; user input optional |

### Circular Economy Model

```
┌─────────┐    ┌──────────┐    ┌──────────┐    ┌─────────────┐
│  Ship   │───▶│   Wear   │───▶│  Return  │───▶│  Refurbish  │──┐
└─────────┘    └──────────┘    └──────────┘    └─────────────┘  │
     ▲                                                          │
     └──────────────────────────────────────────────────────────┘
```

Garments circulate. Learning compounds. Users never shop, never decide, never accumulate.

---

## The Outcome

### For Users
- **Zero cognitive load** — Fresh clothes arrive weekly without any decisions
- **Always fits** — Probabilistic fit intelligence improves with each cycle
- **No accumulation** — Unlimited variety, zero closet clutter

### For the Planet
- **Higher utilization** — Each garment serves multiple users across its lifecycle
- **Closed loop** — Clear end-of-life paths: resale, donation, recycling
- **Reduced waste** — No overproduction, no forgotten closet inventory

### For the Business
- **Predictable revenue** — Weekly subscription cadence
- **Compounding intelligence** — Fit data improves allocation over time
- **Working capital efficiency** — Inventory generates recurring value

---

## Repository Structure

```
your--fit-tailored/
├── memory/                    # Constitutional invariants
│   └── constitution.md        # The 6 non-negotiable truths
│
├── specs/                     # Formal specifications
│   ├── core-system/           # System architecture
│   ├── economics/             # Business model & unit economics
│   ├── features/              # Feature specifications
│   └── pilot-ops/             # Operational playbook
│
├── implementation/            # Build artifacts
│   ├── airtable/              # Database schemas
│   ├── retool/                # Admin UI specifications
│   └── pilot-ops/             # SOPs, checklists, templates
│
├── roadmap/                   # Project trajectory
│   └── THERE-AND-BACK-AGAIN.md  # 5-epoch journey map
│
├── analysis/                  # Project evaluations
│   └── evaluation-to-growth-report.md  # Comprehensive review
│
├── research/                  # AI research prompts
├── origin/                    # Project origin materials
└── assets/                    # Supporting files
```

---

## Quick Start

### Understanding the System

1. **Start with the constitution** — Read `memory/constitution.md` for the 6 invariants governing all design
2. **Review the roadmap** — `roadmap/THERE-AND-BACK-AGAIN.md` explains the 5-epoch journey
3. **Explore specifications** — `specs/` contains formal requirements for each subsystem

### Current Focus: Pilot Preparation

The project is at the end of **Epoch 0 (Conception)** and ready to enter **Epoch 1 (Foundation Build)**:

- Specifications: Complete
- Implementation artifacts: Ready to execute
- Target: 25-user pilot validation

---

## Key Documentation

| Document | Purpose |
|----------|---------|
| [Constitution](memory/constitution.md) | 6 invariants governing all design |
| [System Architecture](specs/core-system/spec.md) | Entity model, state machines, subsystems |
| [Business Model](specs/economics/business-model.md) | Unit economics and pricing analysis |
| [Pilot Playbook](specs/pilot-ops/playbook.md) | Operational procedures and SOPs |
| [Pilot MVP Spec](specs/features/pilot-mvp/spec.md) | Feature requirements for pilot |
| [Roadmap](roadmap/THERE-AND-BACK-AGAIN.md) | 5-epoch journey with gate criteria |
| [Evaluation Report](analysis/evaluation-to-growth-report.md) | Comprehensive project analysis |

---

## Status

| Phase | Status | Description |
|-------|--------|-------------|
| Epoch 0: Conception | Complete | Specifications and planning |
| Epoch 1: Foundation Build | Ready | 3-week implementation sprint |
| Epoch 2: Pilot Validation | Next | 25-user, 8-12 week validation |
| Epoch 3: Maturation | Future | 250 users, fit intelligence |
| Epoch 4: Scaling | Future | 2,500 users, geographic expansion |
| Epoch 5: Sustained | Future | Ongoing operations |

**Current milestone**: Pilot MVP Ready — all specifications complete, implementation artifacts prepared, awaiting execution.

---

## Design Philosophy

> Theoretical failure occurs not when a user dislikes an outfit, but when the user feels required to manage the system. Any UI, communication, or policy that shifts cognitive load back onto the user violates the core premise.

The verification question for any design decision:

> Does this choice reduce uncertainty, friction, or variance across cycles without increasing cognitive load on the user?

If not, it violates the constitution.

---

*Last updated: 2026-01-29*
