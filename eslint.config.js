export default [
  {
    ignores: ['dist/**/*', 'src/utils/*.js'],
  },
  {
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    }
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        console: true,
        process: true,
        module: true,
        require: true,
        __dirname: true,
        __filename: true,
      }
    }
  }
];
