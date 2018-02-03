/* eslint-disable no-console */
const Promise = require('bluebird');
const R = require('ramda');
const defaultOptions = require('./defaultOptions');
const sanitizeOptions = require('./sanitizeOptions');

const getFilename = (path) => {
    return path ? path.replace(/^.*[\\/]/, '') : null;
};

module.exports = (config = {}) => {
    const safeConfig = sanitizeOptions(config);
    let mergedConfig = R.mergeDeepRight(defaultOptions, safeConfig);

    // merge properties that are arrays
    Object.keys(defaultOptions).forEach((name) => {
        const defaultValue = defaultOptions[name];
        const overrideValue = safeConfig[name];
        if (R.is(Array, defaultValue) && R.is(Array, overrideValue)) {
            mergedConfig[name] = [...defaultValue, ...overrideValue];
        }
    });

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

    let app;

    return Promise.try(() => require('./build')(mergedConfig))
        .then(() => {
            require('./killProcesses')(processTitle);

            console.log('Starting REPL');

            if (detach) {
                require('daemonize-process')();
            }

            process.title = processTitle;

            app = require('./makeApp')(mergedConfig);

            return Promise.promisify(app.listen, { context: app })(port);
        })
        .then(() => {
            console.log('REPL server running on port:', port);
            return app;
        });
};
