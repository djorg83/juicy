# juicy-repl

![npm](https://img.shields.io/badge/version-0.0.3-green.svg)

An extensible JavaScript REPL

## Install

``` bash
# with npm
npm install -g juicy-repl

# with yarn
yarn global add juicy-repl
```

## Examples

### Run global command

with command line args
``` bash
juicy --port 80
```

with config file
``` bash
juicy --config "~/REPL_CONFIG.json"
```

with config file added to path
``` bash
# add to ~/.bash_profile or system path
export JUICY_CONFIG=~/REPL_CONFIG.json
```
``` bash
juicy
```

### Spawn a repl from within a program
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

## Author

Daniel Jorgensen <djorg386@gmail.com>