
// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      ['@typescript-eslint']: tseslint.plugin,
    },
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"]
  },
)
