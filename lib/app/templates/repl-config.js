

const R = require('ramda');
const _ = require('lodash');

const processTitle = '{{processTitle}}';

const replPageTitle = '{{replPageTitle}}';

const packageNames = '{{packages}}';

const packageAliases = '{{aliases}}';

const packageVersions = '{{requireVersions}}';

const packages = '{{requirePackages}}';

const definedThemes = '{{themes}}';

const hideHeader = '{{hideHeader}}';

const gaid = '{{gaid}}';

const normalizeAlias = R.pipe(
    R.split('/'),
    R.last,
    _.camelCase
);

// setup package aliases
packageNames.forEach((packageName) => {
    const aliases = (packageAliases[packageName] || []);
    const packageDefaultAlias = normalizeAlias(packageName);
    if (R.isEmpty(aliases) || !aliases.includes(packageDefaultAlias)) {
        aliases.push(packageDefaultAlias);
    }
    packageAliases[packageName] = aliases;
});

const packageMethods = packageNames.reduce((acc, packageName) => Object.assign(acc, {
    [packageName]: Object.keys(packages[packageName]),
}), {});

module.exports = {
    processTitle,
    replPageTitle,
    packageNames,
    packageAliases,
    packageVersions,
    packages,
    packageMethods,
    definedThemes,
    hideHeader,
    gaid,
};
