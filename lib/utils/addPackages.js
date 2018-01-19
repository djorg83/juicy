

const R = require('ramda');

module.exports = (packages) => {
    if (R.isNil(packages) || R.isEmpty(packages)) {
        return Promise.resolve();
    }
    const cleanPackages = packages.split(',').map((p) => p.trim());
    if (R.isNil(cleanPackages) || R.isEmpty(cleanPackages)) {
        return Promise.resolve();
    }
    return fetch(`${window.location.origin}/packages/add`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packages: cleanPackages }),
    })
        .then((res) => res.json())
        .then(R.prop('version'))
        .then((version) => {
            localStorage.setItem('repl-js-suffix', version);
        });
};
