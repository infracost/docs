module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    'react-app',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
      },
    },
  },
  rules: {
    'import/extensions': 'off',
    'max-classes-per-file': 'off',
    'max-len': 'off',
    'no-await-in-loop': 'off',
    'no-continue': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        peerDependencies: true,
      },
    ],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^@theme', '^@docusaurus', '^@site'],
      },
    ],
  },
  ignorePatterns: [],
};
