import { defineConfig } from "cypress";

export default defineConfig({
  // API calls in CI can be slow to respond; allow assertions on
  // API-dependent elements more time to appear before failing.
  defaultCommandTimeout: 20000,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./test/cypress/plugins/index.ts")(on, config);
    },
    specPattern: "test/cypress/integration/**/*.cy.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:3000",
    supportFile: false,
  },
});
