import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

const processEnv = typeof process !== 'undefined' ? process.env : { NODE_ENV: 'development' };

export default [
  // Configuration de base
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.github/**',
      '*.md',
      '*.sql',
      'package-lock.json',
    ],
  },
  // Configuration commune
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Définir les globals nécessaires pour tous les fichiers
        console: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': processEnv.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': processEnv.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-undef': 'error',
    },
  },
  // Configuration pour l'API (backend)
  {
    files: ['api/**/*.js'],
    languageOptions: {
      globals: {
        // Variables globales Node.js
        exports: 'readonly',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      'no-process-exit': 'off',
    },
  },
  // Configuration pour les tests Jest
  {
    files: ['api/**/__tests__/**/*.js', 'api/**/*.test.js', 'api/**/*.spec.js'],
    languageOptions: {
      globals: {
        // Variables globales Jest
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        beforeAll: 'readonly',
        afterEach: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
        vitest: 'readonly',
      },
    },
  },
  // Configuration pour les frontends
  {
    files: ['thread/**/*.js', 'sender/**/*.js'],
    languageOptions: {
      globals: {
        // Variables globales de navigateur
        document: 'readonly',
        window: 'readonly',
        fetch: 'readonly',
      },
    },
    rules: {
      'no-alert': 'warn',
    },
  },
  {
    files: ['*.js'], // Pour tous les JS à la racine (commitlint.config.js, etc.)
    languageOptions: {
      globals: {
        module: 'readonly',
        exports: 'readonly',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },
  // Intégration de Prettier
  prettierConfig,
];
