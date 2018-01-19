/* eslint-disable no-console */


const R = require('ramda');
const beautify = require('./beautify');

let logs = [];
const { log } = console;

const clearLogs = () => {
    logs = [];
};

const addLog = (...args) => {
    logs.push(...args);
};

const getLogs = () => R.ifElse(
    () => !R.isEmpty(logs) && !R.isNil(logs),
    R.always(`${logs.map(beautify).join('\n')}\n\n`),
    R.always('')
)();

console.log = (...args) => {
    addLog(...args);
    log(...args);
};

module.exports = {
    addLog,
    getLogs,
    clearLogs,
};
