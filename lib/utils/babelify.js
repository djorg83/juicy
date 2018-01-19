

const R = require('ramda');

module.exports = (input) => fetch(`${window.location.origin}/babelify`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }),
})
    .then((res) => res.json())
    .then(R.prop('output'));
