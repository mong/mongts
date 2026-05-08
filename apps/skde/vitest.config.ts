import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/

export default defineConfig({
	// biome-ignore lint: no-unused-vars -- global replace, please state reason here
	plugins: [react() as any],
	test: {
		environment: "jsdom",
		globals: true,
		css: { include: [], modules: { classNameStrategy: "non-scoped" } },
	},
});
