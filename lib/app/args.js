const args = require('args');

module.exports = (defaultOptions) => {
    args
        .option(
            'config',
            `Absolute path to config file. default: ${defaultOptions.config}`
        )
        .option(
            'port',
            `The port on which the app will be running. default: ${defaultOptions.port}`
        )
        .option(
            'detach',
            `If true then the server will detach into a child process. default: ${defaultOptions.detatch}`
        )
        .option(
            'processTitle',
            `The process title for the repl server. default: ${defaultOptions.processTitle}`
        )
        .option(
            'replPageTitle',
            `The document title for the repl. default: ${defaultOptions.replPageTitle}`
        );

    return args.parse(process.argv);
};
