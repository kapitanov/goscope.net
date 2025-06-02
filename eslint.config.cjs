const { defineConfig } = require('eslint/config');

const globals = require('globals');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    },

    rules: {
      semi: ['off'],
      'space-before-function-paren': ['off'],
      'vue/max-attributes-per-line': ['off'],
      'vue/singleline-html-element-content-newline': ['off'],
      'vue/html-indent': ['off'],
      'vue/first-attribute-linebreak': ['off'],
      'vue/html-closing-bracket-newline': ['off']
    }
  }
]);
