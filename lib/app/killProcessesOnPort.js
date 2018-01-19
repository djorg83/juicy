/* eslint-disable no-console */


const shell = require('shelljs');

module.exports = (port) => {
    console.log(`Killing processes running on port: ${port}`);
    shell.exec(`lsof -i tcp:${port} | grep node | awk '{print $2}' | xargs kill`);
};
