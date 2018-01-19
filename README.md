# @djorg83/juicy

![npm](https://img.shields.io/badge/version-0.0.1-green.svg)

An extensible JavaScript REPL

## Install

``` bash
# with npm
npm install @djorg83/juicy

# with yarn
yarn add @djorg83/juicy
```

## Basic Example
``` javascript
require('@djorg83/juicy')({
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