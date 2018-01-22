const args = require('args');

module.exports = (defaultOptions) => {
    args
        .option(
            'config',
            `Absolute path to config file. default: ${defaultOptions.config}`,
            defaultOptions.config
        )
        .option(
            'port',
            `The port on which the app will be running. default: ${defaultOptions.port}`,
            defaultOptions.port
        )
        .option(
            'detach',
            `If true then the server will detach into a child process. default: ${defaultOptions.detatch}`,
            defaultOptions.detatch
        )
        .option(
            'processTitle',
            `The process title for the repl server. default: ${defaultOptions.processTitle}`,
            defaultOptions.processTitle
        )
        .option(
            'replPageTitle',
            `The document title for the repl. default: ${defaultOptions.replPageTitle}`,
            defaultOptions.replPageTitle
        );

    return args.parse(process.argv);
};
