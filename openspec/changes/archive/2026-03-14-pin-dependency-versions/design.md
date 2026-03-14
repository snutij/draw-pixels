## Context

All 10 npm dependencies use caret ranges (`^X.Y.Z`). No GitHub Actions exist. The lockfile pins transitive deps but `package.json` itself allows drift.

## Goals / Non-Goals

**Goals:**

- Pin every dependency to the exact currently-installed version
- Eliminate implicit version drift on `npm install`

**Non-Goals:**

- Lockfile integrity checks (e.g., `npm ci` enforcement in CI) — no CI yet
- Pinning transitive dependencies beyond what the lockfile already does

## Decisions

### 1. Exact versions, not lockfile-only

**Decision**: Remove `^` from `package.json` entries, not just rely on `package-lock.json`.

**Why**: The lockfile already pins, but `package.json` caret ranges signal intent to accept patches. Pinning in `package.json` makes the policy explicit and visible in diffs. If someone deletes the lockfile, they still get the intended versions.
