/// <reference types="vitest" />

import {UserConfig, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() as UserConfig["plugins"]],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
