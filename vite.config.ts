import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test-setup.ts",
  },
  lint: {
    categories: {
      correctness: "error",
      suspicious: "error",
      pedantic: "error",
      perf: "error",
      style: "error",
      restriction: "error",
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      // Bitwise operators are intentionally used for hex color generation
      "no-bitwise": "off",
      // Magic numbers are acceptable for small math (bit-shift color, hex radix)
      "no-magic-numbers": "off",
      // React conventionally uses PascalCase filenames for components
      "unicorn/filename-case": "off",
      // React components are conventionally written as function declarations
      "func-style": "off",
      // Optional chaining is a safe and idiomatic modern JS feature
      "oxc/no-optional-chaining": "off",
      // React colocation pattern: handlers defined inside components is idiomatic
      "unicorn/consistent-function-scoping": "off",
      // Tests require async/await for userEvent interactions
      "oxc/no-async-await": "off",
      // Logical key ordering matters more than alphabetical in config objects
      "sort-keys": "off",
      // Test describe blocks are intentionally grouped, not split
      "max-lines-per-function": "off",
      // Ternary in JSX className is idiomatic React — no-ternary is too restrictive
      "no-ternary": "off",
      // sort-imports conflicts with kind-order and module-path constraints simultaneously
      "sort-imports": "off",
      // Single-char loop indices (i) and event params (e) are universally accepted
      "id-length": "off",
      // Comments referencing rule names (e.g. sort-imports) are inherently lowercase
      "capitalized-comments": "off",
      // Keyboard handler legitimately handles 3 keys × 2 state updates each
      "max-statements": "off",
      // init-declarations conflicts with conditional initialization patterns
      "init-declarations": "off",
    },
  },
  staged: {
    "*.{ts,tsx,json,css,md}": "vp check --fix",
  },
});
