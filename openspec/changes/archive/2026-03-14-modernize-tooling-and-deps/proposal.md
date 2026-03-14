## Why

The project's tooling is stuck in 2021: Vite 2, React 17, TypeScript 4, ESLint 7 with a sprawling plugin chain. Five years of ecosystem evolution means we're missing massive DX wins (instant HMR, built-in types, Rust-powered linting/formatting) and carrying dead weight (deprecated plugins, legacy APIs). VoidZero's unified toolchain (Vite 8 + Rolldown, Vitest, oxlint, oxfmt) replaces **all** fragmented tools with a single cohesive, Rust-powered stack.

## What Changes

- **BREAKING** — Upgrade React 17 → 19. Migrate from legacy `ReactDOM.render` to `createRoot` API. Switch to automatic JSX runtime (no more `import React` everywhere).
- **BREAKING** — Upgrade Vite 2 → 8. Replace deprecated `@vitejs/plugin-react-refresh` with `@vitejs/plugin-react`. Vite 8 ships with **Rolldown** as its bundler (no more esbuild/rollup).
- Upgrade TypeScript 4 → 5.7+. Modernize `tsconfig.json` (`"jsx": "react-jsx"`, `"moduleResolution": "bundler"`).
- Replace ESLint 7 + 8 plugins with **oxlint** (VoidZero/oxc). Remove: `eslint`, `@typescript-eslint/*`, `eslint-config-standard`, `eslint-config-prettier`, `eslint-plugin-{import,node,promise,react,react-hooks}`.
- Replace Prettier 2 with **oxfmt** (VoidZero/oxc). Remove `prettier`, `.prettierrc.json`, `.prettierignore`.
- Remove Husky entirely. Use [pre-commit](https://pre-commit.com/) framework with local hooks for oxlint + oxfmt.
- Add **Vitest** for unit testing.
- Remove `@types/react` and `@types/react-dom` (React 19 ships built-in types).
- Nuke `package-lock.json` and regenerate from scratch.

## Capabilities

### New Capabilities

- `voidzero-toolchain`: Vite 8 (Rolldown) + Vitest + oxlint + oxfmt — full VoidZero stack
- `react-19-migration`: React 19 upgrade with createRoot API and automatic JSX runtime
- `dev-quality`: pre-commit framework with local hooks (replaces Husky)

### Modified Capabilities

<!-- No existing specs to modify — this is a greenfield openspec setup -->

## Impact

- **All source files** (`src/**/*.tsx`): JSX runtime change removes `import React` statements, `main.tsx` rewritten for createRoot.
- **Config files**: `vite.config.ts`, `tsconfig.json`, `.eslintrc.js` (deleted), `.prettierrc.json` (deleted), `.prettierignore` (deleted).
- **Dependencies**: ~14 packages removed (incl. husky), ~6 packages added/upgraded. Full `package-lock.json` regeneration.
- **CI/scripts**: `lint` → `oxlint`, `format` → `oxfmt`. `build` script updated. `prepare` script sets `core.hooksPath`.
- **Git hooks**: `.husky/` deleted. Replaced by `.pre-commit-config.yaml` with local hooks.
