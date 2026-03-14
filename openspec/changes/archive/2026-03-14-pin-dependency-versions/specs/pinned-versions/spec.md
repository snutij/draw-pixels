## ADDED Requirements

### Requirement: Exact version pinning in package.json

All entries in `dependencies` and `devDependencies` SHALL use exact versions (no `^`, `~`, or range operators). Versions SHALL match the currently installed versions.

#### Scenario: No range operators in package.json

- **WHEN** inspecting all version strings in `package.json` dependencies and devDependencies
- **THEN** no version string starts with `^`, `~`, `>`, `<`, or `=`

#### Scenario: Versions match installed packages

- **WHEN** running `npm install`
- **THEN** no packages are added, removed, or changed
