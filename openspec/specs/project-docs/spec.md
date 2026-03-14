## ADDED Requirements

### Requirement: MIT LICENSE file

A `LICENSE` file SHALL exist at the project root containing the MIT license text with the current year and author name.

#### Scenario: LICENSE file present

- **WHEN** inspecting the project root
- **THEN** a `LICENSE` file exists with MIT license text

### Requirement: Updated README

The `README.md` SHALL document the current tech stack (React 19, Vite 8, TypeScript, oxlint, oxfmt, Vitest, pre-commit), list all available npm scripts, and include setup instructions.

#### Scenario: README reflects current stack

- **WHEN** reading `README.md`
- **THEN** it mentions React 19, Vite 8, oxlint, oxfmt, Vitest, and pre-commit

#### Scenario: README lists npm scripts

- **WHEN** reading `README.md`
- **THEN** all scripts from `package.json` are documented (dev, build, serve, test, lint, format)
