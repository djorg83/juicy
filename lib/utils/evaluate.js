/* eslint-disable no-eval */
const { tryCatch, prop } = require('ramda');

module.exports = (value) => {
    return tryCatch(
        (output) => eval(output),
        prop('message')
    )(value);
};
