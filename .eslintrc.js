module.exports = {
  extends: 'vvdev-rn',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      'node': {
        'extensions': [
          '.js',
          '.tsx',
          '.ts',
        ],
      },
    },
  },
  rules: {
    'guard-for-in': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'react/sort-comp': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/no-raw-text': 'off',
  },
  globals: {
    XMLHttpRequest: false,
  },
};
