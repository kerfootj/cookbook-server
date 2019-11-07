module.exports = {
    env: {
      node: true,
      commonjs: true,
      es6: true,
    },
    extends: ['eslint:recommended', 'plugin:node/recommended'],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 2018,
    },
    rules: {
      'no-extra-boolean-cast': 'error',
      'no-extra-semi': 'error',
      'no-extra-semi': 'error',
      'no-regex-spaces': 'error',
      'array-callback-return': 'error',
      'node/prefer-promises/dns': 'error',
      'node/prefer-promises/fs': 'error',
      'node/exports-style': ['error', 'module.exports'],
    },
  };
  