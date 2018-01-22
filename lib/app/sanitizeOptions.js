const defaultOptions = require('./defaultOptions');

module.exports = (options) => {
    const base = {};
    Object.keys(defaultOptions).forEach((option) => {
        if (Object.prototype.hasOwnProperty.call(options, option)) {
            // eslint-disable-next-line no-param-reassign
            base[option] = options[option];
        }
    });
    return base;
};
