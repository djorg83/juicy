

const R = require('ramda');

module.exports = (url) => fetch(`${window.location.origin}/shorten`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
})
    .then((res) => res.json())
    .then(R.prop('url'));
