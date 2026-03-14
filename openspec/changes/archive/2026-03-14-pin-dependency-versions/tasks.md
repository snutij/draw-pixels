## 1. Pin dependency versions

- [x] 1.1 Replace all `^X.Y.Z` with `X.Y.Z` in `package.json` dependencies (react, react-dom)
- [x] 1.2 Replace all `^X.Y.Z` with `X.Y.Z` in `package.json` devDependencies (@types/react, @types/react-dom, @vitejs/plugin-react, oxfmt, oxlint, typescript, vite, vitest)
- [x] 1.3 Run `npm install` to verify lockfile stays in sync
- [x] 1.4 Run `npm run build` to verify nothing broke
