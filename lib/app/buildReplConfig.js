/* eslint-disable no-console */
const path = require('path');
const gulp = require('gulp');
const gulpReplace = require('gulp-replace');
const gulpRename = require('gulp-rename');

const absolutePath = (relativePath) => path.join(__dirname, relativePath);

const toObject = (keyVals) => `{
    ${keyVals.join('').trim()}
}`;

const getOutputFilename = ({ suffix }) => {
    return suffix ? `repl-config-${suffix}.js` : 'repl-config.js';
};

const makeKeyVal = (modifier) => (key) => `'${key}': ${modifier(key)},
    `;

const requireVersion = (p) => `require('${p}/package.json').version`;
const requirePackage = (p) => `require('${p}')`;

const makeInjectables = (options) => {
    const packageVersions = options.packages.map(makeKeyVal(requireVersion));
    const packages = options.packages.map(makeKeyVal(requirePackage));
    const config = Object.assign({}, options, { packageNames: options.packages });
    delete config.packages;

    return {
        config: JSON.stringify(config, null, 4),
        packageVersions: toObject(packageVersions),
        packages: toObject(packages),
    };
};

const token = (name) => `'{{${name}}}'`;

module.exports = (options) => {
    const { config, packageVersions, packages } = makeInjectables(options);

    return gulp.src(
        [absolutePath('./templates/repl-config.js')]
    )
        .pipe(
            gulpReplace(token('config'), config)
        )
        .pipe(
            gulpReplace(token('packageVersions'), packageVersions)
        )
        .pipe(
            gulpReplace(token('packages'), packages)
        )
        .pipe(
            gulpRename(getOutputFilename(options))
        )
        .pipe(
            gulp.dest(absolutePath('../../dist'))
        );
};
