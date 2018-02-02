const R = require('ramda');
const path = require('path');
const fileWriter = require('../lib/utils/fileWriter');
const snippets = require('../config/readmeSnippets');

const absolutePath = (relativePath) => path.join(__dirname, relativePath);
const clearFile = (writer) => writer.emptyFile();
const writeFile = (writer) => R.map(writer.writeBlock.bind(writer), snippets);
const done = () => process.exit();
const generateExport = R.pipe(clearFile, writeFile, done);

generateExport(fileWriter(absolutePath('../README.md')));
