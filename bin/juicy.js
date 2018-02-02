#! /usr/bin/env node
/* eslint-disable no-console */

const R = require('ramda');
const sanitizeOptions = require('../lib/app/sanitizeOptions');
const args = sanitizeOptions(require('../lib/app/args'));

console.log('process.env.JUICY_CONFIG', process.env.JUICY_CONFIG);
const globalConfigPath = args.configPath || process.env.JUICY_CONFIG || null;

const globalConfig = sanitizeOptions(
    require('../lib/app/globalConfig')(globalConfigPath)
);

console.log('Received args:', args);
console.log('Merging with global config:', globalConfig);

const config = R.mergeDeepRight(globalConfig, args);

require('../lib/app')(config);
