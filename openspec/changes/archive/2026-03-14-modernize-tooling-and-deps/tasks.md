## 1. Strip old dependencies and config

- [x] 1.1 Remove all ESLint packages from `package.json`: `eslint`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint-config-standard`, `eslint-config-prettier`, `eslint-plugin-import`, `eslint-plugin-node`, `eslint-plugin-promise`, `eslint-plugin-react`, `eslint-plugin-react-hooks`
- [x] 1.2 Remove `@vitejs/plugin-react-refresh` from devDependencies
- [x] 1.3 Remove `@types/react` and `@types/react-dom` from devDependencies
- [x] 1.4 Remove `prettier` from devDependencies
- [x] 1.5 Remove `husky` from devDependencies
- [x] 1.6 Delete `.eslintrc.js`, `.prettierrc.json`, `.prettierignore`
- [x] 1.7 Delete `.husky/` directory entirely
- [x] 1.8 Delete `node_modules/` and `package-lock.json`

## 2. Upgrade core dependencies

- [x] 2.1 Upgrade `react` and `react-dom` to `^19.0.0` in dependencies
- [x] 2.2 Upgrade `typescript` to `^5.7.0` in devDependencies
- [x] 2.3 Upgrade `vite` to `^8.0.0` in devDependencies
- [x] 2.4 Add `@vitejs/plugin-react` (latest) to devDependencies

## 3. Add VoidZero tooling

- [x] 3.1 Add `oxlint` to devDependencies
- [x] 3.2 Add `oxfmt` to devDependencies
- [x] 3.3 Add `vitest` to devDependencies

## 4. Update config files

- [x] 4.1 Update `vite.config.ts`: replace `reactRefresh` import with `react` from `@vitejs/plugin-react`, use `react()` plugin
- [x] 4.2 Update `tsconfig.json`: set `"jsx": "react-jsx"`, `"moduleResolution": "bundler"`
- [x] 4.3 Update `package.json` scripts: `lint` → `oxlint`, `format` → `oxfmt --write .`, add `test` script for Vitest, remove `prepare` (no more husky install)

## 5. Set up pre-commit

- [x] 5.1 Create `.pre-commit-config.yaml` with `repo: local` hooks for oxlint (`npx oxlint`) and oxfmt (`npx oxfmt --check`)
- [x] 5.2 Run `pre-commit install` to activate hooks

## 6. Migrate source code

- [x] 6.1 Rewrite `src/main.tsx`: use `createRoot` from `react-dom/client`, import `{ StrictMode }` from `react`
- [x] 6.2 Remove `import React from "react"` from `src/App.tsx` (keep named imports like `useState`)
- [x] 6.3 Remove `import React from "react"` from `src/Square.tsx` if present, keep named imports

## 7. Clean install and verify

- [x] 7.1 Run `npm install` to generate fresh `package-lock.json`
- [x] 7.2 Run `npm run build` — verify TypeScript compilation and Vite build succeed
- [x] 7.3 Run `npm run lint` — verify oxlint runs without errors
- [x] 7.4 Run `npm run format` — verify oxfmt runs without errors
- [x] 7.5 Run `npm run dev` — verify dev server starts and app renders
- [x] 7.6 Run `npm test` — verify Vitest runs (0 tests passing is fine)
