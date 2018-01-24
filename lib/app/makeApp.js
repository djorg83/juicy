

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const shell = require('shelljs');
const exphbs = require('express-handlebars');

const absolutePath = (relativePath) => path.join(__dirname, relativePath);

module.exports = ({
    replPageTitle,
    gaid,
}) => {
    const app = express();
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: absolutePath('../views/layouts'),
    }));
    app.set('view engine', 'handlebars');
    app.set('views', absolutePath('../views'));
    app.use(bodyParser.json());
    app.use('/images', express.static(absolutePath('../../public/images')));
    app.use('/css', express.static(absolutePath('../../public/css')));
    app.use('/webfonts', express.static(absolutePath('../../public/webfonts')));
    app.use('/js', express.static(absolutePath('../../public/js')));
    app.use('/vs', express.static(absolutePath('../../public/js/vs/min/vs')));

    // services
    app.post('/shorten', require('./middleware/shortenUrl'));
    app.post('/packages/add', require('./middleware/addPackages'));
    app.post('/babelify', require('./middleware/babelify'));
    app.get('/theme/:name', (req, res) => res.sendFile(absolutePath(`../themes/${req.params.name}.json`)));

    // home page
    app.get('/', (req, res) => res.render('home', {
        title: replPageTitle,
        css: [
            'bootstrap-3.0.2.min.css',
            'fontawesome-all.css',
        ],
        replJs: req.query.v ? `repl-${req.query.v}` : 'repl',
        gaid: gaid || null,
    }));

    // spinner page
    app.get('/spin', (req, res) => res.render('spin', {
        title: 'Juicy - Spin',
        css: [],
        gaid: gaid || null,
    }));

    app.shell = shell;
    return app;
};
