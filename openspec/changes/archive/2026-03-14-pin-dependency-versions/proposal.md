## Why

All dependencies use caret ranges (`^`), meaning `npm install` can silently pull different versions across machines and over time. This is a supply chain attack vector — a compromised patch release gets auto-installed. Pinning to exact versions ensures reproducible builds and explicit upgrade decisions.

## What Changes

- Pin all `dependencies` in `package.json` to exact versions (remove `^` prefix)
- Pin all `devDependencies` in `package.json` to exact versions (remove `^` prefix)
- No GitHub Actions to pin (none exist yet)

## Capabilities

### New Capabilities

- `pinned-versions`: Exact version pinning for all npm dependencies

### Modified Capabilities

<!-- None -->

## Impact

- **`package.json`**: All 10 dependency versions change from `^X.Y.Z` to `X.Y.Z`
- **`package-lock.json`**: Regenerated to match
- **Upgrade workflow**: Future upgrades require explicit version bumps (manual or via `npm update`)
