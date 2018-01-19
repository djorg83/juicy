

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const shell = require('shelljs');

const absolutePath = (relativePath) => path.join(__dirname, relativePath);

module.exports = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use('/images', express.static(absolutePath('../../public/images')));
    app.use('/css', express.static(absolutePath('../../public/css')));
    app.use('/webfonts', express.static(absolutePath('../../public/webfonts')));
    app.use('/js', express.static(absolutePath('../../public/js')));
    app.use('/vs', express.static(absolutePath('../../public/js/vs/min/vs')));
    app.get('/theme/:name', (req, res) => res.sendFile(absolutePath(`../themes/${req.params.name}.json`)));
    app.get('/', (req, res) => res.sendFile(absolutePath('../../public/html/index.html')));
    app.post('/shorten', require('./middleware/shortenUrl'));
    app.post('/packages/add', require('./middleware/addPackages'));
    app.post('/babelify', require('./middleware/babelify'));
    app.shell = shell;
    return app;
};
