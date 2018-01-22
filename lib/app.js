/* eslint-disable no-console */
const Promise = require('bluebird');
const R = require('ramda');
const defaultOptions = require('../lib/app/defaultOptions');
const sanitizeOptions = require('../lib/app/sanitizeOptions');

module.exports = (config = {}) => {
    const mergedConfig = R.mergeDeepRight(defaultOptions, sanitizeOptions(config));

    const {
        processTitle,
        port,
        detatch,
    } = mergedConfig;

    global.config = mergedConfig;

    let app;

    return Promise.try(() => require('./app/build')(config)).then(() => {
        require('./app/killProcesses')(processTitle);

        console.log('Starting REPL');

        if (detatch) {
            require('daemonize-process')();
        }

        process.title = processTitle;

        app = require('./app/makeApp')();


        return Promise.promisify(app.listen, { context: app })(port);
    }).then(() => {
        console.log('REPL server running on port:', port);
        return app;
    });
};
