

const R = require('ramda');
const build = require('../build');

module.exports = (req, res) => {
    let newPackages = req.body.packages;

    if (!R.is(Array, newPackages) || R.isEmpty(newPackages)) {
        return res.json({ version: null });
    }

    newPackages = newPackages.map((name) => {
        let packageName = name;
        if (/\(.+\)$/.test(name)) {
            const parts = name.split('(');
            [packageName] = parts;
            global.config.aliases[packageName] = [parts[1].replace(')', '')];
        }
        return packageName;
    });

    const suffix = Date.now();

    const config = Object.assign({}, global.config, {
        packages: R.uniq([...global.config.packages, ...newPackages]),
        suffix,
    });

    return build(config)
        .then(() => res.json({ version: suffix }));
};
