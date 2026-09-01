# Your-Fit-Tailored: humanities edition

## Status and interpretive scope

Your-Fit-Tailored is currently a **design-only** project: a specification
corpus, operating model, setup package, and limited code scaffold. It is not a
deployed service or a completed social experiment. This edition therefore
interprets the project's formal commitments, not the demonstrated experience
of subscribers or workers.

The repository does not yet contain a scholarly bibliography sufficient to
establish a formal intellectual genealogy. References below point to the
project's own primary documents. Connections to broader fields are identified
as interpretation rather than presented as sourced influence.

## Central question

The project asks what happens when getting dressed is reframed from a sequence
of purchases into a temporal relationship among a person, a fleet of garments,
an operating institution, and an accumulating record.

Its declared aim is to make routine clothing decisions approach zero. That
apparently simple promise creates a harder question: **where does agency go when
choice is removed from the visible interface?** It may pass to an operator, an
allocation model, a subscription contract, a logistics schedule, or a set of
defaults. The project is most interesting where it refuses to call this transfer
mere convenience and instead tries to make the hidden decisions explicit.

## The project's internal genealogy

The repository develops through a sequence of formal artifacts:

1. [`memory/constitution.md`](../../memory/constitution.md) states six
   non-negotiable invariants.
2. [`specs/core-system/theoretical-foundation.md`](../../specs/core-system/theoretical-foundation.md)
   defines the conceptual object as a temporal service rather than a retail
   marketplace.
3. [`specs/core-system/spec.md`](../../specs/core-system/spec.md) translates that
   object into entities, state machines, subsystem authority, and failure paths.
4. [`specs/economics/`](../../specs/economics/) subjects the architecture to
   per-cycle costs, inventory capital, and kill conditions.
5. [`specs/pilot-ops/playbook.md`](../../specs/pilot-ops/playbook.md) translates
   those constraints into proposed work performed by people.

This sequence is itself an argument. A value such as “reduce cognitive load” is
not left as brand language; it is supposed to constrain architecture,
economics, and operations downstream. Conversely, a pleasant user experience
does not count as success if it depends on unbounded inventory loss, hidden
manual repair, or falsified state.

The form has affinities with systems theory, control systems, service design,
circular-economy discourse, and event-sourced computation. Those affinities are
visible in its vocabulary and structures, but the repository does not document
which authors or traditions directly influenced the work.

## Dress as time rather than possession

Conventional retail treats the transaction as a terminal event: ownership
passes to a purchaser, and the garment mostly leaves the seller's system. Here,
the garment remains a continuing institutional object. It accumulates wears,
washes, repairs, condition grades, custody events, and eventual retirement.

The project therefore changes the unit of meaning. A garment is not principally
a static item or SKU; it is a reusable asset moving through a biography. A box
is not merely packaging; it binds a promise for one interval. A cycle is not a
delivery; it is a recurring narrative unit with a beginning, complication,
return, reconciliation, and memory.

The weekly cadence makes time constitutional. It is not described as a marketing
frequency that can drift silently. A missed week must become an explicit event
with a reason and recovery. This turns rhythm into both product form and moral
obligation: the institution promises continuity and must account for every
break in it.

## State machines as narrative and institutional memory

The specified state machines define what kinds of stories the system can tell.
`Available`, `Reserved`, `InUse`, `Repair`, `Quarantine`, `Retired`, and `Lost`
are not only database values. They are the institution's recognized conditions
of an object. Anything that happens outside those categories risks becoming
unintelligible to the system.

The event-history requirement similarly defines memory. The design forbids
silent rewriting and prefers compensating events: a mistake remains visible,
followed by a correction. This is a consequential account of institutional
history. It treats continuity as the ability to remember error without allowing
error to corrupt the present state.

That formal choice has an interpretive cost. A state model can preserve what it
has names for while erasing ambiguity it has not modeled. The specifications
partly acknowledge this by introducing bounded uncertainty for contradictory
carrier signals. A mature implementation would need the same humility around
fit, bodily change, cleanliness, damage, preference, and the meaning of non-use.

## Probabilistic fit as epistemology

The project rejects fit as a permanent binary. Its proposed `FitBelief` changes
with evidence and can include uncertainty, drift, and garment aging. In
epistemological terms, the system claims that knowledge of a body-garment
relation is provisional.

This is more adequate than treating a body as one fixed size, but it also
creates a record of the body over time. The project's formal sophistication
therefore increases its ethical obligation. A future fit system would need to
answer who can inspect that record, how long it persists, how inferences may be
used, how a person corrects it, and whether the desire for “zero decisions” can
ever substitute for meaningful consent.

None of those protections is implemented here. The current TypeScript code does
not contain a fit model at all.

## Authorship, agency, and labor

Agency is distributed across at least four prospective actors:

- the subscriber, who supplies a body, a schedule, returns, and optional
  feedback;
- the operator, who allocates garments, grades condition, resolves exceptions,
  and communicates;
- the computational system, which would schedule, gate, record, and eventually
  propose fit allocations;
- external institutions such as carriers, cleaners, identity providers, and
  payment systems, whose signals are accepted but are not supposed to become
  canonical truth automatically.

The repository's most responsible operational choice is to keep several early
judgments human: fit allocation, condition grading, exception handling, and
launch approval. Yet the rhetoric of effortless use can still hide substantial
warehouse, cleaning, delivery, and support labor. A humanities evaluation should
therefore ask not only whether the subscriber works less, but whether the labor
that replaces those decisions is bounded, visible, safe, and economically
possible.

Repository authorship is also mixed. Git history attributes project ownership,
subsequent implementation work, documentation, CI, and maintenance to Anthony
James Padavano and his account aliases. The first artifact commits explicitly
credit Claude Opus 4.5 as a co-author. The available history does not permit
reliable sentence-level separation between human-originated, AI-assisted, and
AI-drafted prose. The [evaluation edition](evaluator.md) preserves that boundary
instead of converting repository ownership into a claim of sole textual
authorship.

## Cultural and institutional stakes

The project moves dress from a private wardrobe into a managed infrastructure.
That could make clothing access more continuous, but it could also convert
ordinary bodily variation and personal preference into operational signals.
The institution would decide what counts as acceptable fit, sufficient variety,
normal wear, damage, contamination, lateness, and risk.

The specifications understand some of this institutional power. They require
named holds rather than informal punishment, auditable corrections rather than
silent mutation, and minimal interventions rather than constant user prompts.
But the repository has no completed policy for privacy, discrimination,
accessibility, worker conditions, dispute resolution, legal agreements, or
safety and hygiene. Those are not peripheral “compliance” details. They shape
what kind of institution the technical form would become.

## Ethical tensions to carry into implementation

| Tension | Formal source | Unresolved question |
|---|---|---|
| Convenience and consent | Cognitive Load Minimization invariant | When is a default genuinely relieving, and when does it prevent informed choice? |
| Learning and surveillance | Probabilistic Fit invariant | What bodily and behavioral evidence may be retained, inferred, corrected, or deleted? |
| Circularity and hygiene | Garment lifecycle states | Who defines safe recirculation, and how is uncertainty communicated? |
| State truth and lived ambiguity | Event sourcing and transition contracts | What happens when experience cannot be represented by the available states? |
| Continuity and discipline | Weekly Cadence invariant | Does a rigid rhythm support the subscriber, or require the subscriber and workers to serve the system's clock? |
| Effortless interface and hidden work | Experience Minimization plus manual pilot SOPs | Is user ease achieved through sustainable operations or displaced labor? |
| Economic survival and inclusion | Unit-economics kill conditions | Which bodies, locations, and service needs become too expensive for the model to include? |

## How computation changes the question

Without computation, the project might remain a styling or rental service.
Computation changes it by making continuity, memory, and uncertainty explicit:

- state transitions make custody and promises inspectable;
- event history lets the institution reconstruct how an outcome occurred;
- probabilistic fit allows knowledge to change instead of fixing a permanent
  identity;
- scheduling turns weekly rhythm into an enforceable temporal contract;
- lifecycle counters let one physical object carry a history across many users;
- exception models define failure as part of the service rather than an anomaly
  outside it.

The crucial test is whether the eventual computation remains answerable to the
human questions it formalizes. At present, that test cannot be performed: the
domain runtime and pilot do not exist in the evidence.

## Further reading and evidence

- [Two-minute explanation](general.md)
- [Technical edition](technical.md)
- [Operational edition](business.md)
- [Contribution and evaluation record](evaluator.md)
- [Claim-level evidence record](../evidence/README.md)
- [Canonical README](../../README.md)
