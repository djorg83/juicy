const args = require('args');

const isTruthy = (value) => value === true ||
    value === 'true' ||
    value === '1' ||
    value === 1;

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
            `If true then the server will detach into a child process. default: ${defaultOptions.detach}`
        )
        .option(
            'processTitle',
            `The process title for the repl server. default: ${defaultOptions.processTitle}`
        )
        .option(
            'replPageTitle',
            `The document title for the repl. default: ${defaultOptions.replPageTitle}`
        );

    const parsedArgs = args.parse(process.argv);

    if (Object.prototype.hasOwnProperty.call(parsedArgs, 'detach')) {
        parsedArgs.detach = isTruthy(parsedArgs.detach);
    }

    return parsedArgs;
};
