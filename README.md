# juicy-repl

![npm](https://img.shields.io/badge/version-0.0.0-green.svg)

An extensible JavaScript REPL

## Install

``` bash
# with npm
npm install juicy-repl

# with yarn
yarn add juicy-repl
```

## Basic Example
``` javascript
require('juicy-repl')({
    packages: [
        'ramda',
        'joi',
    ],
    processTitle: 'juicy-repl',
    port: 3000,
    autoLaunch: true,
    replPageTitle: 'Juicy REPL',
    aliases: {
        'ramda': [
            'R',
            'ramda',
            'Ramda',
        ],
    },
});
```

## Demo
Start a demo REPL and open in the browser.
``` bash
yarn start
```

## Development Mode
Start demo REPL, open in the browser, and watch for changes.
``` bash
yarn dev
```

## Author

Daniel Jorgensen <djorg386@gmail.com>