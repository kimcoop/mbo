module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:import/warnings'],
    plugins: ['prettier'],
    parserOptions: {
        allowImportExportEverywhere: true,
        ecmaVersion: 6,
    },
    env: {
        browser: true,
        node: true,
    },
    settings: {
        'import/resolver': {
            'babel-module': {},
            node: {
                paths: ['./src'],
            },
        },
    },
    root: true,
    rules: {
        'prettier/prettier': ['error'],
        'react/no-danger': 0,
        semi: 0,
        'react/jsx-filename-extension': 0,
        'react/react-in-jsx-scope': 0,
        'import/no-cycle': 0,
        'lines-between-class-members': 0,
        'jsx-a11y/mouse-events-have-key-events': 0,
    },
}
