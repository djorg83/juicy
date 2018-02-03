/* eslint-disable no-eval, no-unused-vars */
const { tryCatch, prop } = require('ramda');

module.exports = (value, console) => {
    return tryCatch(
        (output) => eval(output),
        prop('message')
    )(value);
};
