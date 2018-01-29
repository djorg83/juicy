const R = require('ramda');

const replaceUnserializables = (value) => R.cond([
    [R.is(Array), R.map(replaceUnserializables)],
    [R.is(Function), R.always('[Function]')],
    [R.equals(undefined), R.always('[undefined]')],
    [R.is(Object), R.mapObjIndexed(replaceUnserializables)],
    [R.T, R.identity],
])(value);

const restoreUnserializables = R.pipe(
    R.replace(/['"]?\[Function\]['"]?/g, 'Function'),
    R.replace(/['"]?\[undefined\]['"]?/g, 'undefined')
);

module.exports = R.pipe(
    replaceUnserializables,
    (value) => JSON.stringify(value, null, 2),
    restoreUnserializables
);
