/* eslint-disable no-console */


const path = require('path');
const Promise = require('bluebird');
const latestVersion = require('latest-version');
const shell = require('shelljs');
const R = require('ramda');

const absolutePath = (relativePath) => path.join(__dirname, relativePath);

module.exports = (packages) => {
    if (R.isEmpty(packages) || R.isNil(packages)) {
        return Promise.resolve();
    }

    console.log('Installing packages...');

    const installs = [];
    const upgrades = [];

    return Promise.mapSeries(packages, (p) => {
        console.log(`-- ${p}`);
        return latestVersion(p).then((latestV) => {
            try {
                console.log('---- latest version', latestV);
                const installedVersion = require(`${p}/package.json`).version;
                console.log('---- installed version', installedVersion);
                if (latestV !== installedVersion) {
                    upgrades.push(`${p}@${latestV}`);
                    console.log(`---- Upgrading ${p}@${latestV}`);
                } else {
                    console.log(`---- Skipping ${p}`);
                }
            } catch (error) {
                console.log('---- installed version', 'none');
                installs.push(`${p}@${latestV}`);
                console.log(`---- Installing ${p}@${latestV}`);
            }
            return null;
        });
    }).then(() => {
        if (!R.isEmpty(installs)) {
            shell.exec(`cd ${absolutePath('../../')} && yarn add -D ${installs.join(' ')}`);
        }
        if (!R.isEmpty(upgrades)) {
            shell.exec(`cd ${absolutePath('../../')} && yarn add -D ${upgrades.join(' ')}`);
        }
        return null;
    });
};
