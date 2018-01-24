/* eslint-disable no-console */
const { readdirSync } = require('fs');
const path = require('path');
const gulp = require('gulp');
const gulpReplace = require('gulp-replace');
const gulpRename = require('gulp-rename');

const absolutePath = (relativePath) => path.join(__dirname, relativePath);

module.exports = ({
    packages,
    aliases,
    processTitle,
    replPageTitle,
    hideHeader,
    gaid,
    suffix,
}) => {
    console.log('Building repl-config.js');

    const outputFilename = suffix ? `repl-config-${suffix}.js` : 'repl-config.js';

    const requireVersions = packages.map((p) => `'${p}': require('${p}/package.json').version,
    `);

    const requirePackages = packages.map((p) => `'${p}': require('${p}'),
    `);

    const themes = readdirSync(absolutePath('../themes'))
        .map((filename) => filename.replace('.json', ''));

    return gulp.src([absolutePath('./templates/repl-config.js')])
        .pipe(gulpReplace('\'{{packages}}\'', JSON.stringify(packages, null, 4)))
        .pipe(gulpReplace('\'{{aliases}}\'', JSON.stringify(aliases, null, 4)))
        .pipe(gulpReplace('\'{{themes}}\'', JSON.stringify(themes, null, 4)))
        .pipe(gulpReplace('\'{{hideHeader}}\'', hideHeader))
        .pipe(gulpReplace('{{replPageTitle}}', replPageTitle))
        .pipe(gulpReplace('{{processTitle}}', processTitle))
        .pipe(gulpReplace('\'{{gaid}}\'', `'${gaid}'` || '""'))
        .pipe(gulpReplace('\'{{requireVersions}}\'', `{
    ${requireVersions.join('').trim()}
}`))
        .pipe(gulpReplace('\'{{requirePackages}}\'', `{
    ${requirePackages.join('').trim()}
}`))
        .pipe(gulpRename(outputFilename))
        .pipe(gulp.dest(absolutePath('../../dist')));
};
