const args = require('args');
const R = require('ramda');
const options = require('../../config/options.json');

const isTruthy = (value) => value === true ||
    value === 'true' ||
    value === '1' ||
    value === 1;

options.forEach(({ name, defaultValue, description }) => {
    if (R.is(Object, defaultValue) || R.is(Array, defaultValue)) {
        return;
    }
    args.option(name, `${description} default: ${defaultValue}`);
});

const parsedArgs = args.parse(process.argv);

const boolOptions = options.filter(({ defaultValue }) => R.is(Boolean, defaultValue));

boolOptions.forEach(({ name }) => {
    if (Object.prototype.hasOwnProperty.call(parsedArgs, name)) {
        parsedArgs[name] = isTruthy(parsedArgs[name]);
    }
});

module.exports = parsedArgs;
