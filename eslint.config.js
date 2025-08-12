import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: [
      js.configs.recommended,
      eslintPluginPrettierRecommended,
      eslintConfigPrettier
    ],
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue', '**/*.tsx'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser }
    }
  }
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
])
