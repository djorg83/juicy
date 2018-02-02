/* eslint-disable no-console */
const path = require('path');
const gulp = require('gulp');

const absolutePath = (relativePath) => path.join(__dirname, relativePath);

module.exports = (from) => {
    const to = absolutePath('../../public/images/dist');

    if (!from) {
        return Promise.resolve();
    }

    console.log(`Copying image from: ${from} to: ${to}`);

    return gulp.src(from).pipe(gulp.dest(to));
};
