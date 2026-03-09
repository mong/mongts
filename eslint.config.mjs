
// @ts-check

import tseslint from 'typescript-eslint';
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
	{
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.vitest,
        JSX: "readonly",
        React: "readonly"
      }
    },
		files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
		plugins: {
			['@typescript-eslint']: tseslint.plugin,
		},
		extends: tseslint.configs.recommended,
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "warn",
		},
	},
]);
