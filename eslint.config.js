import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import tseslint from "@typescript-eslint/eslint-plugin";
import vueParser from "vue-eslint-parser";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import prettier from "eslint-config-prettier";

/**
 * Project eslint configuration.
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  {
    ignores: ["dist", "node_modules", "coverage"],
  },

  js.configs.recommended,
  ...vue.configs["flat/recommended"],

  {
    files: ["**/*.ts", "**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.eslint.json",
        extraFileExtensions: [".vue"],
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      vue,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": "error",

      "vue/multi-word-component-names": "off",
      "vue/no-unused-components": "warn",
      "vue/no-mutating-props": "error",

      "unused-imports/no-unused-imports": "error",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^@?\\w"], ["^#?\\w"], ["^\\./", "^\\.\\./"], ["^/"], ["^.+\\.(css|scss)([?].*)?$"]],
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.eslint.json",
        },
      },
    },
  },
  {
    files: ["vite.config.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  prettier,
];
