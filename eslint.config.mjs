// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    plugins: { 'jsx-a11y': jsxA11y },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': 'warn',
    },
  },
  {
    // Relax some rules for Astro script blocks which use inline script patterns
    files: ['**/*.astro'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  }
);
