

const R = require('ramda');

// Rainglow Token Colors:
//
// {
//     "name": "Comment",
//     "scope": "comment",
//     "settings": {
//         "foreground": "#44515e"
//     }
// },

// Monaco Rules:
//
// { token: '', foreground: '000000', background: 'fffffe' },
// { token: 'invalid', foreground: 'cd3131' },

const getBaseTheme = R.pipe(
    R.prop('type'),
    R.cond([
        [R.equals('light'), R.always('vs')],
        [R.T, R.always('vs-dark')],
    ])
);

const trimRight = R.curry((desiredLength, str) => {
    return R.ifElse(
        R.lte(str.length),
        R.always(str),
        () => str.substr(0, desiredLength)
    )(desiredLength);
});

const normalizeHexValues = R.mapObjIndexed(R.when(
    R.test(/^#/),
    R.pipe(R.replace(/^#/, ''), trimRight(6))
));

const tokenToRule = ({ settings, scope = '' }) => Object.assign(
    normalizeHexValues(settings),
    { token: scope }
);

module.exports = (theme) => Object.assign(
    {
        base: getBaseTheme(theme),
        inherit: true,
        rules: theme.tokenColors.map(tokenToRule),
    },
    theme
);
