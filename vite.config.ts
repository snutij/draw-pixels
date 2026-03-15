import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test-setup.ts",
  },
  staged: {
    "*.{ts,tsx,json,css,md}": "vp check --fix",
  },
});
