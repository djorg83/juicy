

const path = require('path');

const absolutePath = (relativePath) => path.join(__dirname, relativePath);

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: absolutePath('./lib/entry.jsx'),
    output: {
        path: absolutePath('./public/js'),
        filename: 'repl.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: /juicy-js[/\\]lib/,
                use: 'babel-loader',
            },
        ],
    },
    resolveLoader: {
        modules: [absolutePath('./node_modules')],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    externals: {
        net: '{}',
        dns: '{}',
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: absolutePath('./node_modules/monaco-editor'),
                to: 'vs',
            },
        ]),
    ],
};
