/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@unumid/eslint-config-react', 'next', 'prettier'],
  plugins: [],
  ignorePatterns: ['.next', 'build', '.history', 'node_modules'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
};
