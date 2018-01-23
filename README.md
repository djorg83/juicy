# juicy-repl

An extensible JavaScript REPL

[![NPM](https://nodei.co/npm/juicy-repl.png?downloads=true&stars=true)](https://nodei.co/npm/juicy-repl/)

[![NPM version](http://img.shields.io/npm/v/juicy-repl.svg)](https://www.npmjs.com/package/juicy-repl)
[![Downloads](https://img.shields.io/npm/dm/juicy-repl.svg)](https://www.npmjs.com/package/juicy-repl)
[![David](https://img.shields.io/david/djorg83/juicy.svg?maxAge=2592000)](https://github.com/djorg83/juicy)
[![devDependencies Status](https://david-dm.org/djorg83/juicy/dev-status.svg)](https://david-dm.org/djorg83/juicy?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/djorg83/juicy.svg?maxAge=2592000)](https://github.com/djorg83/juicy)
[![license](https://img.shields.io/github/license/djorg83/juicy.svg?maxAge=2592000)](https://github.com/djorg83/juicy)
[![GitHub stars](https://img.shields.io/github/stars/djorg83/juicy.svg?style=social&label=Star&maxAge=2592000)](https://github.com/djorg83/juicy)
[![Built with love](https://img.shields.io/badge/built%20with-love-ff69b4.svg)](https://img.shields.io/badge/built%20with-love-ff69b4.svg)

[![Powered by NodeJS](https://img.shields.io/badge/powered%20by-NodeJS-yellowgreen.svg)](https://nodejs.org/en/)<br>
[![Powered by express](https://img.shields.io/badge/powered%20by-express-yellowgreen.svg)](https://expressjs.com/)<br>
[![Powered by Monaco](https://img.shields.io/badge/powered%20by-monaco-yellowgreen.svg)](https://microsoft.github.io/monaco-editor/)<br>
[![Powered by Rainglow](https://img.shields.io/badge/powered%20by-rainglow-yellowgreen.svg)](https://rainglow.io/)<br>
[![Powered by react](https://img.shields.io/badge/powered%20by-react-yellowgreen.svg)](https://reactjs.org/)<br>
[![Powered by webpack](https://img.shields.io/badge/powered%20by-webpack-yellowgreen.svg)](https://webpack.js.org/)<br>
[![Powered by babel](https://img.shields.io/badge/powered%20by-babel-yellowgreen.svg)](https://babeljs.io/)<br>
[![Powered by gulp](https://img.shields.io/badge/powered%20by-gulp-yellowgreen.svg)](https://gulpjs.com/)

# Why use Juicy?
- Juicy supports private npm packages. Just install `juicy-repl` globally and host it on your machine, tell it which packages to include, and in less than a minute you have a custom REPL running locally.
- Flow. Juicy supports [Flow](https://flow.org/) syntax, allowing you to copy and paste directly from your source without making syntax modifications.
- 300+ themes.  Juicy implements all themes from [Rainglow](https://rainglow.io/). Thanks to [Dayle Rees](https://daylerees.com) for building these themes.
- Same [editor](https://microsoft.github.io/monaco-editor/) as [VS Code](https://code.visualstudio.com/).
- Autocomplete/intellisense
- Easy sharing. Quickly create a link to what you're working on and share it with anyone.
- Save your work. Juicy allows you to pin your work and return to it at anytime without any need to signup or login.
- Last but not least, Juicy is just plain awesome!

# Demo
[juicy-js.com](http://juicy-js.com)

# Running using global command

Install juicy-repl
``` bash
# with npm
npm install -g juicy-repl

# with yarn
yarn global add juicy-repl
```

Example 1: out of the box quick start
``` bash
juicy
```

Example 2: with command line args
``` bash
juicy --port 80 --detach false --processTitle "custom-repl" --replPageTitle "My Custom REPL" --hideHeader true
```

Example 3: with config file
``` bash
juicy --config "~/REPL_CONFIG.json"
```

Example 4: with config file added environment variables
``` bash
# add to ~/.bash_profile
export JUICY_CONFIG=~/REPL_CONFIG.json
```
``` bash
juicy
```

# Running from within a program

Install juicy-repl
``` bash
# with npm
npm install --save juicy-repl

# with yarn
yarn add juicy-repl
```

``` javascript
const startRepl = require('juicy-repl');

// supply any, all, or no options
const juicyOptions = {
    port: 3000,
    packages: [
        'ramda',
        'joi',
    ],
    aliases: {
        'ramda': [
            'R',
            'ramda',
            'Ramda',
        ],
    },
    processTitle: 'juicy-repl',
    replPageTitle: 'Juicy REPL',
    detach: true,
    hideHeader: false,
};

startRepl(juicyOptions);
```

# Development
``` bash
git clone https://github.com/djorg83/juicy
cd juicy
yarn dev
```

# Configuration

## port
Default: `3000`

The port number the REPL server will be exposed on.

----

## packages
Default:
``` javascript
[
    'ramda',
    'joi',
    'lodash',
    'bluebird',
    'moment',
    'uuid',
]
```

A list of npm packages to include when building the REPL.

----

## aliases
Default:
``` javascript
{
    ramda: ['R', 'Ramda'],
    lodash: ['_'],
    bluebird: ['Promise'],
}
```

Specify one or more aliases to expose as global variables for the packages.

----

## processTitle
Default: `'juicy-repl'`

The `process.title` for the REPL server process.

----

## replPageTitle
Default: `'Juicy REPL'`

The `document.title` for the REPL browser app.

----

## detach
Default: `true`

If true, then the REPL server will detach into a child process and allow the main process to exit. Otheriwse the main process will suspend while the REPL server is running. It is suggested to set `detach` to `false` if using `nohup` or a process manager such as `forever` or `pm2`.

----

## hideHeader
Default: `false`

If true, then the header of the REPL will be hidden.

----

## Command line args
- `--port 80`
- `--detach false`
- `--hideHeader true`
- `--processTitle "custom-repl"`
- `--replPageTitle "My Custom REPL"`

## Author

Daniel Jorgensen <djorg386@gmail.com>