/* eslint-disable no-console */
const Promise = require('bluebird');
const webpack = require('webpack');

const webpackP = Promise.promisify(webpack, { context: webpack });

module.exports = ({ suffix }) => {
    console.log('Building repl.js');
    let config = require('../../webpack.config');
    if (suffix) {
        const output = Object.assign({}, config.output, {
            filename: config.output.filename.replace('repl', `repl-${suffix}`),
        });
        config = Object.assign({}, config, { output });
    }
    return webpackP(config);
};
