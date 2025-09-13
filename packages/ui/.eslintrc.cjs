/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@telegram-ios-academy/eslint-config-react', 'plugin:storybook/recommended'],
  plugins: ['@telegram-ios-academy/eslint-rules'],
  rules: {
    '@telegram-ios-academy/eslint-rules/no-raw-design-values': 'error'
  },
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: {
        // Relax rules for storybook files if needed
        '@telegram-ios-academy/eslint-rules/no-raw-design-values': 'warn'
      }
    }
  ]
};