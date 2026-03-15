import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";

export default defineConfig({
  lint: {
    categories: {
      correctness: "error",
      pedantic: "error",
      perf: "error",
      restriction: "error",
      style: "error",
      suspicious: "error",
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    overrides: [
      {
        files: ["**/*.test.*"],
        rules: {
          // Tests require async/await for userEvent interactions
          "max-lines-per-function": "off",
          "oxc/no-async-await": "off",
        },
      },
    ],
    rules: {
      // React components with JSX inherently exceed 50 lines — markup is declarative, not imperative
      "max-lines-per-function": "off",
      // Ternary in JSX className is idiomatic React — no alternative exists
      "no-ternary": "off",
      // Optional chaining is a safe, standard ES2020 feature
      "oxc/no-optional-chaining": "off",
      // Declaration sort conflicts across syntax kinds; member sort within {} is enforced
      "sort-imports": ["error", { ignoreDeclarationSort: true }],
      // React conventionally uses PascalCase filenames for components
      "unicorn/filename-case": ["error", { cases: { kebabCase: true, pascalCase: true } }],
    },
  },
  plugins: [react()],
  staged: {
    "*.{ts,tsx,json,css,md}": "vp check --fix",
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test-setup.ts",
  },
});
