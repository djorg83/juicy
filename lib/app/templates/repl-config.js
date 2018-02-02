const R = require('ramda');
const _ = require('lodash');

const config = '{{config}}';

config.packageVersions = '{{packageVersions}}';

config.packages = '{{packages}}';

const normalizeAlias = R.pipe(
    R.split('/'),
    R.last,
    _.camelCase
);

// setup package aliases
config.packageNames.forEach((packageName) => {
    const aliases = (config.aliases[packageName] || []);
    const packageDefaultAlias = normalizeAlias(packageName);
    if (R.isEmpty(aliases) || !aliases.includes(packageDefaultAlias)) {
        aliases.push(packageDefaultAlias);
    }
    config.aliases[packageName] = aliases;
});

config.packageMethods = config.packageNames.reduce((acc, packageName) => Object.assign(acc, {
    [packageName]: Object.keys(config.packages[packageName]),
}), {});

module.exports = config;
