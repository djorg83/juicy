const args = require('args');
const R = require('ramda');

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
            'hideHeader',
            `If true then the header of the REPL will be hidden. default: ${defaultOptions.hideHeader}`
        )
        .option(
            'gaid',
            `If set, then Google Analytics will be added to the page. default: ${defaultOptions.gaid}`
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

    const boolOptions = Object.keys(defaultOptions).filter((option) => R.is(Boolean, defaultOptions[option]));

    boolOptions.forEach((option) => {
        if (Object.prototype.hasOwnProperty.call(parsedArgs, option)) {
            parsedArgs[option] = isTruthy(parsedArgs[option]);
        }
    });

    return parsedArgs;
};
