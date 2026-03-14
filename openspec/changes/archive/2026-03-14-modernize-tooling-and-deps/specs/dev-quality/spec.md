## ADDED Requirements

### Requirement: pre-commit framework with local hooks

The project SHALL use the [pre-commit](https://pre-commit.com/) framework for git hooks. A `.pre-commit-config.yaml` SHALL define local hooks for oxlint and oxfmt. Husky SHALL be removed entirely.

#### Scenario: Pre-commit hook runs on commit

- **WHEN** developer makes a git commit
- **THEN** pre-commit runs oxlint and oxfmt on staged files

#### Scenario: pre-commit config exists

- **WHEN** inspecting the project root
- **THEN** `.pre-commit-config.yaml` exists with `repo: local` hooks for oxlint and oxfmt

#### Scenario: Husky fully removed

- **WHEN** inspecting the project
- **THEN** `husky` is not in `package.json`
- **THEN** the `.husky/` directory does not exist

### Requirement: Clean dependency tree

All packages that are no longer used SHALL be removed from `package.json`. This includes at minimum: `eslint`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint-config-standard`, `eslint-config-prettier`, `eslint-plugin-import`, `eslint-plugin-node`, `eslint-plugin-promise`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `@vitejs/plugin-react-refresh`, `@types/react`, `@types/react-dom`, `prettier`, `husky`.

#### Scenario: No orphan dependencies

- **WHEN** inspecting `package.json`
- **THEN** none of the removed packages are listed in dependencies or devDependencies

### Requirement: Lock file regenerated

The `package-lock.json` SHALL be regenerated from scratch after all dependency changes.

#### Scenario: Lock file matches package.json

- **WHEN** running `npm install`
- **THEN** no changes are made to `package-lock.json` (it is already in sync)
