/* eslint-disable no-console */
const { readdirSync } = require('fs');
const path = require('path');
const gulp = require('gulp');
const gulpReplace = require('gulp-replace');

const absolutePath = (relativePath) => path.join(__dirname, relativePath);

module.exports = () => {
    console.log('Building repl-themes.js');

    const themes = readdirSync(absolutePath('../themes'))
        .map((filename) => filename.replace('.json', ''));

    return gulp.src([absolutePath('./templates/repl-themes.js')])
        .pipe(gulpReplace('\'{{themes}}\'', JSON.stringify(themes, null, 4)))
        .pipe(gulp.dest(absolutePath('../../dist')));
};
