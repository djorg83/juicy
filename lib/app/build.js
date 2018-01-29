/* eslint-disable no-console */
const Promise = require('bluebird');

module.exports = (config) => {
    const {
        packages,
        versions = {},
        suffix = '',
    } = config;

    const configWithDefaultsSet = Object.assign({}, config, { suffix, versions });

    return Promise.try(() => require('./preinstall')(packages, versions))
        .then(() => require('./buildReplConfig')(configWithDefaultsSet))
        .delay(100)
        .then(() => require('./buildEntryJsx')(configWithDefaultsSet))
        .delay(100)
        .then(() => require('./buildThemesJs')(configWithDefaultsSet))
        .delay(100)
        .then(() => require('./buildJs')(configWithDefaultsSet));
};
