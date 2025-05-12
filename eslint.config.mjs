import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const processEnv = typeof process !== 'undefined' ? process.env : { NODE_ENV: 'development' };

export default [
  // Configuration de base
  {
    ignores: [
      'node_modules/**',
      'api/dist/**',
      'build/**',
      '.github/**',
      '*.md',
      '*.sql',
      'package-lock.json',
      'thread/.vite',
      'sender/.vite',
    ],
  },
  // Configuration commune
  {
    files: ['**/*.{js,ts,tsx}'],
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
    files: ['api/**/*.{js,ts,tsx}'],
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
    files: [
      'api/**/__tests__/**/*.{js,ts,tsx}',
      'api/**/*.test.{js,ts,tsx}',
      'api/**/*.spec.{js,ts,tsx}',
    ],
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
    files: ['thread/**/*.{js,ts,tsx}', 'sender/**/*.{js,ts,tsx}'],
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
    files: ['*.{js,ts,tsx}'], // Pour tous les JS à la racine (commitlint.config.js, etc.)
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
  // Config spécifique pour tous les fichiers TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./api/tsconfig.json'], // Attention à l'emplacement et au nom de ton tsconfig pour l'API !
        tsconfigRootDir: process.cwd(),
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  // Intégration de Prettier
  prettierConfig,
];
