module.exports = {
    packages: [
        'ramda',
        'joi',
        'lodash',
        'bluebird',
        'moment',
        'uuid',
    ],
    aliases: {
        ramda: ['R', 'Ramda'],
        lodash: ['_'],
        bluebird: ['Promise'],
    },
    config: null,
    port: 3000,
    detach: true,
    processTitle: 'juicy-repl',
    replPageTitle: 'Juicy REPL',
};
