/* eslint-disable no-console */
const path = require('path');
const gulp = require('gulp');
const gulpReplace = require('gulp-replace');
const gulpRename = require('gulp-rename');

const absolutePath = (relativePath) => path.join(__dirname, relativePath);

module.exports = ({ suffix }) => {
    console.log('Building entry.jsx');

    const filenameSuffix = suffix ? `-${suffix}` : '';

    const outputFilename = `entry${filenameSuffix}.jsx`;

    return gulp.src([absolutePath('./templates/entry.jsx')])
        .pipe(gulpReplace('{{suffix}}', filenameSuffix))
        .pipe(gulpRename(outputFilename))
        .pipe(gulp.dest(absolutePath('../../dist')));
};
