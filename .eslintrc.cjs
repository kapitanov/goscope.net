module.exports = {
  env: {
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  rules: {
    semi: ['off'],
    'space-before-function-paren': ['off'],
    'vue/max-attributes-per-line': ['off'],
    'vue/singleline-html-element-content-newline': ['off'],
    'vue/html-indent': ['off'],
    'vue/first-attribute-linebreak': ['off'],
    'vue/html-closing-bracket-newline': ['off'],
  }
};
