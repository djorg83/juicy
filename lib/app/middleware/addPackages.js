

const R = require('ramda');
const build = require('../build');

module.exports = (req, res) => {
    let newPackages = req.body.packages;

    if (!R.is(Array, newPackages) || R.isEmpty(newPackages)) {
        return res.json({ version: null });
    }

    const newAliases = {};
    const versions = {};

    newPackages = newPackages.map((name) => {
        const parts = name.split('!!');
        const [packageName, aliases = '', version = null] = parts;
        newAliases[packageName] = aliases.split(',');
        if (version) {
            versions[packageName] = version;
        }
        return packageName;
    });

    const suffix = Date.now();

    const overrides = {
        packages: R.uniq([...global.config.packages, ...newPackages]),
        aliases: R.mergeDeepRight(global.config.aliases, newAliases),
        versions,
        suffix,
    };

    console.log('Building custom repl with these settings', overrides);

    const config = Object.assign({}, global.config, overrides);

    return build(config)
        .then(() => res.json({ version: suffix }));
};
