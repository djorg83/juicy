const path = require('path');
const Promise = require('bluebird');
const { existsSync } = require('fs');
const customBuild = require('../customBuild');
const Hash = require('../hash');

const absolutePath = (relativePath) => path.join(__dirname, relativePath);

module.exports = (req, res, next) => {
    const { packages } = req.query;
    if (!packages) {
        // no packages set, return default repl js
        return next();
    }

    const hash = Hash.from(packages);

    if (
        existsSync(absolutePath(`../../../dist/entry-${hash}.jsx`)) &&
        existsSync(absolutePath(`../../../dist/repl-config-${hash}.js`)) &&
        existsSync(absolutePath(`../../../public/js/repl-${hash}.js`))
    ) {
        // custom version already built, return custom version
        req.jsVersion = hash;
        return next();
    }

    return Promise.try(() => {
        return customBuild(packages.split('|'));
    }).then((buildId) => {
        if (!buildId) {
            console.log('Custom build id is missing');
            return next(new Error('Failed to build'));
        }
        req.jsVersion = buildId;
        return next();
    }).catch((err) => {
        console.log('Unexpected error during custom build:', err.message);
        next(err);
    });
};
