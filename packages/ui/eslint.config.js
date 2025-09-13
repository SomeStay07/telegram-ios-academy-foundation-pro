const noRawDesignValues = await import('../../packages/eslint-rules/no-raw-design-values.js');
const typescriptParser = await import('@typescript-eslint/parser');

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser.default,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      'design-tokens': {
        rules: {
          'no-raw-design-values': noRawDesignValues.default
        }
      }
    },
    rules: {
      'design-tokens/no-raw-design-values': 'error'
    }
  },
  {
    files: ['**/*.stories.*'],
    rules: {
      // Relax rules for storybook files if needed
      'design-tokens/no-raw-design-values': 'warn'
    }
  }
];