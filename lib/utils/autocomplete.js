

const R = require('ramda');

module.exports = ({ packageMethods, packageAliases }) => {
    const getSuggestions = () => R.flatten(Object.keys(packageMethods).map((packageName) => {
        const methods = packageMethods[packageName];
        const aliases = packageAliases[packageName];
        return R.flatten(aliases.map((alias) => methods.map((methodName) => `${alias}.${methodName}`)));
    }));

    return {
        getSuggestions,
    };
};

