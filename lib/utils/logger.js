/* eslint-disable no-console */

const Rx = require('rxjs');
const R = require('ramda');
const beautify = require('./beautify');

const logs$ = new Rx.BehaviorSubject([]);
let logs = [];
const { log } = console;

const clearLogs = () => {
    logs = [];
    logs$.next(logs);
};

const addLog = (...args) => {
    log(...args);
    logs.push(...args);
    logs$.next(logs);
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
    logs$,
};
