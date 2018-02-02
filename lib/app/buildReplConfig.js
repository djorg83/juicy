/* eslint-disable no-console */
const path = require('path');
const gulp = require('gulp');
const gulpReplace = require('gulp-replace');
const gulpRename = require('gulp-rename');

const absolutePath = (relativePath) => path.join(__dirname, relativePath);

module.exports = (config) => {
    console.log('Building repl-config.js');

    const { suffix } = config;

    const outputFilename = suffix ? `repl-config-${suffix}.js` : 'repl-config.js';

    const packageVersions = config.packages.map((p) => `'${p}': require('${p}/package.json').version,
    `);

    const packages = config.packages.map((p) => `'${p}': require('${p}'),
    `);

    const mergedConfig = Object.assign({}, config, { packageNames: config.packages });
    delete mergedConfig.packages;

    return gulp.src([absolutePath('./templates/repl-config.js')])
        .pipe(gulpReplace('\'{{config}}\'', JSON.stringify(mergedConfig, null, 4)))
        .pipe(gulpReplace('\'{{packageVersions}}\'', `{
    ${packageVersions.join('').trim()}
}`))
        .pipe(gulpReplace('\'{{packages}}\'', `{
    ${packages.join('').trim()}
}`))
        .pipe(gulpRename(outputFilename))
        .pipe(gulp.dest(absolutePath('../../dist')));
};
