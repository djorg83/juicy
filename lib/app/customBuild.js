const R = require('ramda');
const build = require('./build');
const Hash = require('./hash');

module.exports = (newPackages) => {
    if (!R.is(Array, newPackages) || R.isEmpty(newPackages)) {
        return Promise.reject(new Error('Cannot build REPL with no packages'));
    }

    const hash = Hash.from(newPackages.join('|'));

    const newAliases = {};
    const versions = {};

    // eslint-disable-next-line no-param-reassign
    newPackages = newPackages.map((name) => {
        const parts = name.split('!');
        const [packageName, aliases = '', version = null] = parts;
        newAliases[packageName] = aliases.split(',');
        if (version) {
            versions[packageName] = version;
        }
        return packageName;
    });

    const overrides = {
        packages: R.uniq([...global.config.packages, ...newPackages]),
        aliases: R.mergeDeepRight(global.config.aliases, newAliases),
        versions,
        suffix: hash,
    };

    console.log('Building custom repl with these settings', overrides);

    const config = Object.assign({}, global.config, overrides);

    return build(config).then(() => hash);
};
