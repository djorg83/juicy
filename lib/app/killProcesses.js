/* eslint-disable no-console */
const shell = require('shelljs');

module.exports = (processTitle) => {
    console.log(`Killing processes with name: ${processTitle}`);
    shell.exec(`pgrep ${processTitle} | xargs kill`);
};
