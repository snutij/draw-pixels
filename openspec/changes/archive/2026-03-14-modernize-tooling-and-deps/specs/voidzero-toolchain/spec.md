## ADDED Requirements

### Requirement: Vite 8 as dev server and bundler

The project SHALL use Vite 8.x as the development server and production bundler. Vite 8 ships with Rolldown (Rust bundler) natively. The `@vitejs/plugin-react` (not the deprecated `plugin-react-refresh`) SHALL be used for React support.

#### Scenario: Dev server starts successfully

- **WHEN** developer runs `npm run dev`
- **THEN** Vite 8 dev server starts and serves the app with HMR enabled

#### Scenario: Production build succeeds

- **WHEN** developer runs `npm run build`
- **THEN** Vite 8 produces an optimized production build in `dist/`

### Requirement: oxlint replaces ESLint

The project SHALL use oxlint (VoidZero/oxc) as the sole linter. All ESLint packages SHALL be removed: `eslint`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint-config-standard`, `eslint-config-prettier`, `eslint-plugin-import`, `eslint-plugin-node`, `eslint-plugin-promise`, `eslint-plugin-react`, `eslint-plugin-react-hooks`. The `.eslintrc.js` config file SHALL be deleted.

#### Scenario: Linting runs with oxlint

- **WHEN** developer runs `npm run lint`
- **THEN** oxlint checks all `.tsx` and `.ts` files and reports issues

#### Scenario: ESLint fully removed

- **WHEN** inspecting `package.json` devDependencies
- **THEN** no package containing `eslint` in its name is present

### Requirement: oxfmt replaces Prettier

The project SHALL use oxfmt (VoidZero/oxc) as the sole formatter. Prettier SHALL be removed entirely. The `.prettierrc.json` and `.prettierignore` files SHALL be deleted.

#### Scenario: Formatting runs with oxfmt

- **WHEN** developer runs `npm run format`
- **THEN** oxfmt formats all supported files (`.ts`, `.tsx`, `.json`, `.css`, `.md`)

#### Scenario: Prettier fully removed

- **WHEN** inspecting `package.json` devDependencies
- **THEN** `prettier` is not present
- **THEN** no `.prettierrc*` or `.prettierignore` files exist in the project root

### Requirement: Vitest available for testing

The project SHALL include Vitest as a devDependency. A `test` script SHALL be added to `package.json`.

#### Scenario: Test runner is available

- **WHEN** developer runs `npm test`
- **THEN** Vitest executes and reports results (zero tests passing is acceptable initially)

### Requirement: Deprecated Vite plugin removed

The `@vitejs/plugin-react-refresh` package SHALL be removed from devDependencies. It SHALL be replaced by `@vitejs/plugin-react` in `vite.config.ts`.

#### Scenario: No deprecated plugin in dependencies

- **WHEN** inspecting `package.json`
- **THEN** `@vitejs/plugin-react-refresh` is not present in any dependency section
