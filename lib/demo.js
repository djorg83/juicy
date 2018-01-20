

require('./app')({
    packages: [
        'ramda',
        'joi',
        'lodash',
        'bluebird',
        'moment',
        'uuid',
    ],
    processTitle: 'juicy-repl-demo',
    port: 80,
    autoLaunch: false,
    replPageTitle: 'Juicy REPL',
    aliases: {
        ramda: [
            'R',
            'Ramda',
        ],
        lodash: [
            '_',
        ],
        bluebird: [
            'Promise',
        ],
    },
});
