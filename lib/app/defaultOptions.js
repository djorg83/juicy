const options = require('../../config/options.json');

module.exports = options.reduce((defaultOptions, { name, defaultValue }) => {
    return Object.assign(defaultOptions, { [name]: defaultValue });
}, {});
