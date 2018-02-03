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

    const installs = [];

    return Promise.mapSeries(packages, (p) => {
        return Promise.join(
            p,
            versions[p] || latestVersion(p)
        ).spread((p, preferredV) => {
            try {
                const installedVersion = require(`${p}/package.json`).version;
                if (preferredV !== installedVersion) {
                    installs.push(`${p}@${preferredV}`);
                }
            } catch (error) {
                installs.push(`${p}@${preferredV}`);
            }
            return null;
        });
    }).then(() => {
        if (!R.isEmpty(installs)) {
            console.log('Installing packages...', installs);
            shell.exec(`cd ${absolutePath('../../')} && yarn add -D ${installs.join(' ')}`);
        }
        return null;
    });
};
