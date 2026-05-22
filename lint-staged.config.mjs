/** @type {import('lint-staged').Config} */
export default {
  "*.{js,jsx,ts,tsx,mjs,cjs,mts,cts,json,html,yml,yaml,css,md}": [
    "biome format --write",
    "biome check --no-errors-on-unmatched",
  ],
};
