/* eslint-disable no-console */
const Promise = require('bluebird');
const webpack = require('webpack');
const path = require('path');

const absolutePath = (relativePath) => path.join(__dirname, relativePath);
const webpackP = Promise.promisify(webpack, { context: webpack });

module.exports = ({ suffix }) => {
    let config = require('../../webpack.config');
    const filenameSuffix = suffix ? `-${suffix}` : '';
    if (suffix) {
        const entry = absolutePath(`../../dist/entry${filenameSuffix}.jsx`);
        const output = Object.assign({}, config.output, {
            filename: config.output.filename.replace('repl', `repl-${suffix}`),
        });
        config = Object.assign({}, config, { entry, output });
    }
    console.log(`Building repl${filenameSuffix}.js`);

    const start = Date.now();
    return webpackP(config)
        .then(() => {
            console.log(`-- took ${Date.now() - start}ms`);
        })
        .catch((err) => {
            console.log('WEBPACK ERROR', err);
            throw err;
        });
};
