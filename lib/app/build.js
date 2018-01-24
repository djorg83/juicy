/* eslint-disable no-console */
const Promise = require('bluebird');

module.exports = (config) => {
    const {
        packages,
        suffix = '',
    } = config;

    const start = Date.now();
    let afterInstall;
    let afterBuildReplConfig;
    let afterBuildJs;

    return Promise.try(() => require('./preinstall')(packages)).then(() => {
        afterInstall = Date.now();
        console.log(`-- took ${afterInstall - start}ms`);

        return require('./buildReplConfig')(Object.assign({}, config, { suffix }));
    }).then(() => {
        afterBuildReplConfig = Date.now();
        console.log(`-- took ${afterBuildReplConfig - afterInstall}ms`);

        return require('./buildJs')({ suffix });
    }).then(() => {
        afterBuildJs = Date.now();
        console.log(`-- took ${afterBuildJs - afterBuildReplConfig}ms`);
    });
};
