module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: [
            './tsconfig.eslint.json',
            './tsconfig.json',
        ],
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:@typescript-eslint/recommended',
    ],
    rules:  {
        // "@typescript-eslint/explicit-function-return-type": "off",
    }
}