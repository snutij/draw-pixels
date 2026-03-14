## Context

draw-pixels is a small React pixel-art app (~6 source files) frozen on 2021-era tooling:

| Tool       | Current       | Target         | Source       |
| ---------- | ------------- | -------------- | ------------ |
| Vite       | 2.3           | 8.0 (Rolldown) | VoidZero     |
| Vitest     | —             | 4.1            | VoidZero     |
| oxlint     | —             | 1.55           | VoidZero/oxc |
| oxfmt      | —             | 0.40           | VoidZero/oxc |
| React      | 17.0          | 19.x           | Meta         |
| TypeScript | 4.1           | 5.7+           | Microsoft    |
| Husky      | 6             | **removed**    | —            |
| ESLint     | 7 + 8 plugins | **removed**    | —            |
| Prettier   | 2.3           | **removed**    | —            |

The codebase is tiny, so the migration is low-risk but touches every config file and a few source files.

## Goals / Non-Goals

**Goals:**

- Adopt full VoidZero stack: Vite 8, Vitest, oxlint, oxfmt — every tool that has a VoidZero equivalent gets replaced
- Upgrade React to 19 with modern APIs (createRoot, automatic JSX runtime)
- Remove all deprecated/unnecessary dependencies
- Zero non-VoidZero tools for build, test, lint, format

**Non-Goals:**

- Feature work on the app itself
- Adding CSS-in-JS, state management, or other new libraries
- Setting up CI/CD pipelines
- Migrating to a monorepo or workspace structure

## Decisions

### 1. oxlint over ESLint 9 flat config

**Decision**: Replace ESLint entirely with oxlint instead of migrating to ESLint 9 flat config.

**Why**: oxlint is 50-100x faster, zero-config for TypeScript + React, and part of the VoidZero stack. The current ESLint setup has 8 plugins — migrating all of them to flat config is more work than switching to oxlint.

**Alternative considered**: ESLint 9 + `typescript-eslint` v8 + flat config. Rejected because it still requires multiple plugin packages, is slower, and isn't VoidZero.

### 2. oxfmt over Prettier 3

**Decision**: Replace Prettier entirely with oxfmt (VoidZero/oxc formatter).

**Why**: oxfmt passes 100% of Prettier's JS/TS conformance tests, runs ~30x faster, and is part of the VoidZero/oxc toolchain. It supports all formats we need (TS, TSX, JSON, CSS, Markdown). Using it completes the all-VoidZero strategy — no third-party linter or formatter.

**Risk**: oxfmt is beta (0.40). Mitigated by: small codebase, Prettier conformance at 100% for JS/TS, and easy to swap back if needed.

**Alternative considered**: Prettier 3 upgrade. Rejected to maximize VoidZero adoption per user request.

### 3. Vite 8 (with Rolldown) over Vite 6

**Decision**: Target Vite 8.0.0 instead of Vite 6, as it ships with Rolldown (Rust bundler) natively.

**Why**: Vite 8 is the latest stable. It replaces esbuild+rollup internals with Rolldown, another VoidZero project. Going to Vite 6 would mean upgrading again soon. Vite 8 gives us the full VoidZero bundling stack out of the box.

**Alternative considered**: Vite 6 (conservative). Rejected because Vite 8 is stable and maximizes VoidZero.

### 4. Nuke node_modules + lockfile

**Decision**: Delete `node_modules/` and `package-lock.json`, reinstall from scratch.

**Why**: With ~13 packages being removed and major version bumps across the board, a clean install avoids phantom dependency issues.

### 5. React 19 with automatic JSX runtime

**Decision**: Go straight to React 19, use automatic JSX transform.

**Why**: React 18 is in maintenance. The app uses no deprecated patterns beyond `ReactDOM.render`. The only code changes needed are in `main.tsx` (createRoot) and removing `import React`.

### 6. pre-commit framework over Husky

**Decision**: Remove Husky entirely. Use the [pre-commit](https://pre-commit.com/) framework with local hooks running oxlint and oxfmt.

**Why**: pre-commit is a language-agnostic hook framework that runs commands on staged files. It handles stashing unstaged changes, parallel execution, and caching. `.pre-commit-config.yaml` with `repo: local` hooks calling our oxlint and oxfmt binaries — clean and explicit.

**Alternative considered**: Husky 9. Rejected — JS-specific, adds an npm dependency for something pre-commit handles better across languages.

## Risks / Trade-offs

- **[oxfmt is beta]** → 100% Prettier JS/TS conformance. Small codebase. Easy rollback to Prettier if any issues.
- **[React 19 breaking changes]** → The app uses only `useState` and basic DOM. No class components, no legacy context, no string refs. Risk near-zero.
- **[oxlint rule coverage gap]** → oxlint doesn't cover 100% of ESLint rules. → Current ruleset is mostly defaults. oxlint covers react-hooks, no-use-before-define, etc.
- **[Lock file diff noise]** → Full lockfile regeneration = unreadable diff. → Acceptable; alternative risks ghost dependencies.
- **[Vite 8 is brand new]** → Stable release, powers the VoidZero reference stack. Small project = low blast radius.
