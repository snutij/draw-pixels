## ADDED Requirements

### Requirement: React 19 as runtime

The project SHALL use React 19.x and ReactDOM 19.x as production dependencies. The `@types/react` and `@types/react-dom` packages SHALL be removed (React 19 ships built-in TypeScript types).

#### Scenario: React 19 installed

- **WHEN** inspecting `package.json` dependencies
- **THEN** `react` and `react-dom` versions are `^19.0.0`

#### Scenario: No separate type packages

- **WHEN** inspecting `package.json` devDependencies
- **THEN** `@types/react` and `@types/react-dom` are not present

### Requirement: createRoot API

The app entry point (`src/main.tsx`) SHALL use the `createRoot` API from `react-dom/client` instead of the legacy `ReactDOM.render`.

#### Scenario: App renders with createRoot

- **WHEN** the app starts
- **THEN** `createRoot(document.getElementById("root")!).render(...)` is used
- **THEN** no import from `react-dom` top-level (only from `react-dom/client`)

### Requirement: Automatic JSX runtime

TypeScript SHALL be configured with `"jsx": "react-jsx"` to use the automatic JSX runtime. Source files SHALL NOT contain `import React from "react"` unless React is used as a value (e.g., `React.createElement`, `React.StrictMode`).

#### Scenario: JSX compiles without React import

- **WHEN** a `.tsx` file contains JSX but no explicit React import
- **THEN** the file compiles successfully with no errors

#### Scenario: StrictMode still works

- **WHEN** `main.tsx` uses `<StrictMode>` wrapper
- **THEN** StrictMode is imported as a named import: `import { StrictMode } from "react"`

### Requirement: TypeScript 5.7+

The project SHALL use TypeScript 5.7 or later. `tsconfig.json` SHALL use `"moduleResolution": "bundler"` and `"jsx": "react-jsx"`.

#### Scenario: TypeScript version is current

- **WHEN** inspecting `package.json` devDependencies
- **THEN** `typescript` version is `^5.7.0` or higher
