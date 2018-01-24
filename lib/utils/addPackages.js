const R = require('ramda');
const queryParams = require('./queryParams')();

module.exports = (packages) => {
    if (R.isNil(packages) || R.isEmpty(packages)) {
        return Promise.resolve();
    }
    return fetch(`${window.location.origin}/packages/add`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packages }),
    })
        .then((res) => res.json())
        .then(R.prop('version'))
        .then((version) => {
            queryParams.setRawParam('v', version);
        });
};
