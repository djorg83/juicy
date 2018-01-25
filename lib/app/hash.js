const shorthash = require('shorthash');

module.exports = {
    from: (value) => shorthash.unique(value),
};
