# Local verification receipt: 2026-08-31

## Scope

This receipt records local, read-only verification of repository code and
documentation structure before the reader-mode pilot was finalized. It does not
represent GitHub Actions, an external deployment, Airtable/Retool execution, or
a service pilot.

## Environment

| Field | Value |
|---|---|
| Verified at | 2026-08-31T22:35:46Z |
| Base commit | `7d23744f1e689316631a5156753b5d7a52fcf0dc` |
| Branch | `main` |
| Node.js | `v24.19.0` |
| npm | `11.9.0` |

## Repository checks before documentation edits

| Command | Result | Boundary |
|---|---|---|
| `npm ci` | **Failed** with `ERESOLVE` | `typescript@7.0.2` conflicts with the `>=4.8.4 <6.1.0` peer range declared by `typescript-eslint@8.67.0`. |
| `npm ci --legacy-peer-deps` | **Passed**; 147 packages installed | This bypasses peer-dependency resolution and is not evidence that the default install is healthy. |
| `npm run lint` | **Passed** | Runs `tsc --noEmit`. |
| `npm run lint:eslint` | **Failed** | `typescript-eslint` reports that it does not support TypeScript 7.0. |
| `npm run build` | **Passed** | Compiles the generic TypeScript scaffold. |
| `npm test` | **Passed** | Vitest reported 3 test files and 16 tests passed. |

## Tested surface

The passing build and tests cover only:

- `SubscriptionManager` and `SubscriptionTier`;
- `ProductCatalog` search, filtering, lookup, and duplicate handling;
- barrel exports from `src/index.ts`.

They do not cover:

- the specified User, Garment, Box, or Cycle entities;
- state-transition contracts or event sourcing;
- weekly scheduling and closeout;
- fit beliefs or allocation;
- Airtable automation scripts;
- Retool page/query setup;
- carrier, payment, identity, cleaning, repair, or communications integrations;
- an end-to-end pilot cycle.

## Documentation checks

After the reader-mode files were written:

- `project-record.yml` passed the canonical
  `project-record-v1.schema.json` validator;
- all 11 assertion files passed `assertion-evidence.v1.schema.json`;
- 122 repository-local Markdown links resolved;
- 23 local Markdown heading anchors resolved;
- every project-record assertion reference existed and matched its declared
  assertion ID;
- every local-file and Git-commit evidence body matched its recorded SHA-256.

These checks should be rerun in CI after the documentation-engine integration
is published.

## Status and publication reconciliation

Read-only checks found three stale `seed.yaml` fields and one broken historical
ADR link:

| Check | Result | Repair |
|---|---|---|
| `metadata.implementation_status` | `ACTIVE` conflicted with the roadmap's end-of-Epoch-0 state, `ecosystem.yaml` delivery `not_started`, and absence of a domain runtime. | Normalized to `DESIGN_ONLY`. |
| `agents[0].workflow` | Pointed to absent `.github/workflows/ci-typescript.yml`. | Corrected to existing `.github/workflows/ci.yml`. |
| `metadata.deployment_url` | Former organization Pages URL returned HTTP 404. | Corrected to `https://4444j99.github.io/your-fit-tailored/`, which returned HTTP 200 on 2026-08-31. |
| ADR corpus link | `https://github.com/meta-organvm/organvm-corpvs-testamentvm` returned HTTP 404. | Replaced with a non-linked repository reference rather than guessing a private or moved URL. |

The HTTP 200 endpoint is a documentation publication generated from the
README. It is not the proposed apparel-service runtime and does not change the
project's `not-deployed` application status.
