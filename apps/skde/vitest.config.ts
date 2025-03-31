/// <reference types="vitest" />

import { ViteUserConfig, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() as ViteUserConfig["plugins"]],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
