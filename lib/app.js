/* eslint-disable no-console */


const Promise = require('bluebird');

module.exports = (config) => {
    const {
        processTitle = 'js-repl',
        port = 8821,
        autoLaunch = true,
    } = config;

    global.config = config;

    let app;

    return Promise.try(() => require('./app/build')(config)).then(() => {
        require('./app/killProcessesOnPort')(port);

        console.log('Starting REPL');

        require('daemonize-process')();

        process.title = processTitle;

        app = require('./app/makeApp')();

        return Promise.promisify(app.listen, { context: app })(port);
    }).then(() => {
        require('./app/maybeLaunchInBrowser')({ autoLaunch, port });
        return app;
    });
};
