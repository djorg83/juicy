# juicy-repl

![npm](https://img.shields.io/badge/version-0.0.13-green.svg)

An extensible JavaScript REPL

## Running using global command

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
juicy --port 80 --detatch false --processTitle "custom-repl" --replPageTitle "My Custom REPL"
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

### Running from within a program

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
    packages: [
        'ramda',
        'joi',
    ],
    processTitle: 'juicy-repl',
    port: 3000,
    detatch: true,
    replPageTitle: 'Juicy REPL',
    aliases: {
        'ramda': [
            'R',
            'ramda',
            'Ramda',
        ],
    },
};

startRepl(juicyOptions);
```

## Development
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

## detatch
Default: `true`
If true, then the REPL server will detach into a child process and allow the main process to exit. Otheriwse the main process will suspend while the REPL server is running. It is suggested to set `detach` to `false` if using `nohup` or a process manager such as `forever` or `pm2`.

----

## Command line args
- `--port 80`
- `--detatch false`
- `--processTitle "custom-repl"`
- `--replPageTitle "My Custom REPL"`

## Author

Daniel Jorgensen <djorg386@gmail.com>