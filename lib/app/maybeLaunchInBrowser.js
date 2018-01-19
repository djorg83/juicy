/* eslint-disable no-console */
const shell = require('shelljs');

module.exports = ({ autoLaunch, port }) => {
    if (autoLaunch === true) {
        console.log('Launching into browser...');
        shell.exec(`open http://localhost:${port}/`);
    }
};
