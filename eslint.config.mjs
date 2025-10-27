import js from "@eslint/js"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import globals from "globals"

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: "module",
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // Suas regras customizadas
      "no-useless-constructor": "off",
      "@typescript-eslint/no-explicit-any": "off",
      semi: ["error", "never"],
      "@typescript-eslint/semi": ["error", "never"],

      // Possíveis erros
      "no-console": "warn",
      "no-debugger": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Melhores práticas
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "no-eval": "error",

      // Estilo de código
      indent: ["error", 2],
      quotes: ["error", "single"],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "arrow-spacing": "error",
      "space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always",
        },
      ],

      // ES6+
      "no-duplicate-imports": "error",
      "prefer-template": "error",
      "template-curly-spacing": ["error", "never"],
      "object-shorthand": ["error", "always"],

      // TypeScript específico
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-inferrable-types": "off",
    },
  },
  {
    ignores: ["node_modules/", "dist/", "build/", "coverage/", "*.config.js"],
  },
]
