/* eslint-disable import/no-unresolved */
window.JUICY_REPL_CONFIG = require('./repl-config{{suffix}}');
const React = require('react');
const { render } = require('react-dom');
const App = require('../lib/components/App.jsx');

render(<App />, document.getElementById('content'));
