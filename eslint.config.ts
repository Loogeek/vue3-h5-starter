import antfu from '@antfu/eslint-config';

export default antfu(
  {
    vue: true,
    typescript: true,
    formatters: true,
    stylistic: {
      quotes: 'single',
      semi: true,
    },
  },
  {
    rules: {
      'no-console': 'off',
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      'node/prefer-global/process': 'off',
      'jsdoc/require-returns-description': 'off',
      'regexp/no-unused-capturing-group': 'warn',
      'style/comma-dangle': ['error', 'only-multiline'],
    },
  },
  {
    ignores: [
      'dist',
      'public',
      '*.d.ts',
      '**/*.md',
      'docs/**',
      'index.html',
      '.eslintrc-auto-import.json',
      '.agents/**',
      '.codex/**',
      '.cursor/**',
    ],
  },
);
