const http = require('http');

module.exports = (req, res) => {
    const url = `http://tinyurl.com/api-create.php?url=${encodeURIComponent(req.body.url)}`;

    http.get(url, (response) => {
        response.on('data', (chunk) => res.json({ url: chunk.toString() }));
    }).on('error', () => res.json({ url: '' }));
};
