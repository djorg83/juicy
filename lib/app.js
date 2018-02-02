/* eslint-disable no-console */
const Promise = require('bluebird');
const R = require('ramda');
const defaultOptions = require('../lib/app/defaultOptions');
const sanitizeOptions = require('../lib/app/sanitizeOptions');

const getFilename = (path) => {
    return path ? path.replace(/^.*[\\/]/, '') : null;
};

module.exports = (config = {}) => {
    console.log('Received config:', config);
    console.log('Merging with default options:', defaultOptions);
    let mergedConfig = R.mergeDeepRight(defaultOptions, sanitizeOptions(config));

    mergedConfig = R.mergeDeepRight(mergedConfig, {
        spinnerFilename: getFilename(mergedConfig.spinnerPath),
        headerLogoFilename: getFilename(mergedConfig.headerLogoPath),
        faviconFilename: getFilename(mergedConfig.faviconPath),
    });

    const {
        processTitle,
        port,
        detach,
    } = mergedConfig;

    global.config = mergedConfig;

    console.log('Using config:', mergedConfig);

    let app;

    return Promise.try(() => require('./app/build')(mergedConfig))
        .then(() => {
            require('./app/killProcesses')(processTitle);

            console.log('Starting REPL');

            if (detach) {
                require('daemonize-process')();
            }

            process.title = processTitle;

            app = require('./app/makeApp')(mergedConfig);

            return Promise.promisify(app.listen, { context: app })(port);
        })
        .then(() => {
            console.log('REPL server running on port:', port);
            return app;
        });
};
