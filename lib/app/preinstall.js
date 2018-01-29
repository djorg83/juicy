/* eslint-disable no-console */


const path = require('path');
const Promise = require('bluebird');
const latestVersion = require('latest-version');
const shell = require('shelljs');
const R = require('ramda');

const absolutePath = (relativePath) => path.join(__dirname, relativePath);

module.exports = (packages, versions = {}) => {
    if (R.isEmpty(packages) || R.isNil(packages)) {
        return Promise.resolve();
    }

    console.log('Installing packages...');

    const installs = [];

    return Promise.mapSeries(packages, (p) => {
        console.log(`-- ${p}`);
        return Promise.join(
            p,
            versions[p] || latestVersion(p)
        ).spread((p, preferredV) => {
            try {
                console.log('---- preferred version', preferredV);
                const installedVersion = require(`${p}/package.json`).version;
                console.log('---- installed version', installedVersion);
                if (preferredV !== installedVersion) {
                    installs.push(`${p}@${preferredV}`);
                    console.log(`---- Installing ${p}@${preferredV}`);
                } else {
                    console.log(`---- Skipping ${p}`);
                }
            } catch (error) {
                console.log('---- installed version', 'none');
                installs.push(`${p}@${preferredV}`);
                console.log(`---- Installing ${p}@${preferredV}`);
            }
            return null;
        });
    }).then(() => {
        if (!R.isEmpty(installs)) {
            shell.exec(`cd ${absolutePath('../../')} && yarn add -D ${installs.join(' ')}`);
        }
        return null;
    });
};
