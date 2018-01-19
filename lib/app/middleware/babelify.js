

const Promise = require('bluebird');
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const { writeFile, readFile, unlink } = require('fs');

const writeFileAsync = Promise.promisify(writeFile);
const readFileAsync = Promise.promisify(readFile);
const unlinkAsync = Promise.promisify(unlink);
const tryUnlink = (filePath) => unlinkAsync(filePath).catch(() => Promise.resolve());

const absolutePath = (relativePath) => path.join(__dirname, relativePath);

const filename = 'temp-babel-file.js';
const tempInputFile = absolutePath(`../../../dist/${filename}`);
const tempOutputDir = absolutePath('../../../dist/out');
const tempOutputFile = absolutePath(`../../../dist/out/${filename}`);

module.exports = (req, res) => {
    let output;
    let error;
    return Promise.try(() => writeFileAsync(tempInputFile, req.body.input))
        .then(() => gulp.src([tempInputFile])
            .pipe(babel({
                presets: ['flow', 'latest'],
            }))
            .on('error', function onError() {
                error = { error: 'Babel parsing error' };
                this.emit('end');
            })
            .pipe(gulp.dest(tempOutputDir))
            .on('end', () => {
                if (error) {
                    return res.json({ output: error });
                }
                // eslint-disable-next-line
                return readFileAsync(tempOutputFile)
                    .then((result) => {
                        output = error || result.toString('utf8');
                        return Promise.join(
                            tryUnlink(tempInputFile),
                            tryUnlink(tempOutputFile)
                        );
                    })
                    .then(() => res.json({ output }))
                    .catch((e) => {
                        res.json({ output: { error: e.message } });
                    });
            }))
        .catch((e) => {
            res.json({ output: { error: e.message } });
        });
};
