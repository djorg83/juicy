#! /usr/bin/env node

const R = require('ramda');
const defaultOptions = require('../lib/app/defaultOptions');

const sanitizeOptions = require('../lib/app/sanitizeOptions');

const args = sanitizeOptions(
    require('../lib/app/args')(defaultOptions)
);

const globalConfigPath = args.config || process.env.JUICY_CONFIG || null;

const globalConfig = sanitizeOptions(
    require('../lib/app/globalConfig')(globalConfigPath)
);

const config = R.mergeDeepRight(globalConfig, args);

require('../lib/app')(config);
