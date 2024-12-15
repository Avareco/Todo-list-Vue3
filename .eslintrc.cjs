/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: ['simple-import-sort', 'vue'],
    rules: {
        'simple-import-sort/imports': ['error'],
        'comma-dangle': ['error', 'always-multiline'],
        'newline-before-return': 'error',
        'arrow-body-style': ['error', 'as-needed'],
        curly: 'error',
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['Timeline'],
            },
        ],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 1,
                multiline: 1,
            },
        ],
        'vue/attributes-order': [
            // Order of attributes in template
            'warn',
            {
                order: [
                    'CONDITIONALS',
                    'LIST_RENDERING',
                    'DEFINITION',
                    'RENDER_MODIFIERS',
                    'GLOBAL',
                    ['UNIQUE', 'SLOT'],
                    'TWO_WAY_BINDING',
                    'OTHER_DIRECTIVES',
                    'OTHER_ATTR',
                    'CONTENT',
                    'EVENTS',
                ],
                alphabetical: false,
            },
        ],
        'vue/component-tags-order': [
            'error',
            {
                order: ['script', 'template', 'style'],
            },
        ],
        'vue/html-closing-bracket-newline': [
            'warn',
            {
                // Require or disallow a line break before tag's closing brackets
                singleline: 'never',
                multiline: 'always',
            },
        ],
        'vue/html-indent': [
            'error',
            2,
            {
                // Enforce consistent indentation in <template>
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        'vue/component-name-in-template-casing': [
            // Enforce specific casing for the component naming style in template
            'error',
            'PascalCase',
            {
                registeredComponentsOnly: true,
                ignores: [],
            },
        ],
        "vue/require-macro-variable-name": ["error", {
            "defineProps": "props",
            "defineEmits": "emit",
            "defineSlots": "slots",
            "useSlots": "slots",
            "useAttrs": "attrs",
        }],
        'vue/component-definition-name-casing': ['error', 'PascalCase'], // Enforce specific casing for component definition name
        '@typescript-eslint/type-annotation-spacing': 'error', // Space after type annotation
        '@typescript-eslint/consistent-type-imports': 'error', // Enforce consistent usage of type imports
    },
}
