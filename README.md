# juicy-repl

An extensible JavaScript REPL

[![NPM](https://nodei.co/npm/juicy-repl.png?downloads=true&stars=true)](https://nodei.co/npm/juicy-repl/)

[![NPM version](https://img.shields.io/npm/v/juicy-repl.svg)](https://www.npmjs.com/package/juicy-repl)
[![Downloads](https://img.shields.io/npm/dm/juicy-repl.svg)](https://www.npmjs.com/package/juicy-repl)
[![David](https://img.shields.io/david/djorg83/juicy.svg?maxAge=2592000)](https://github.com/djorg83/juicy)
[![devDependencies Status](https://david-dm.org/djorg83/juicy/dev-status.svg)](https://david-dm.org/djorg83/juicy?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/djorg83/juicy.svg?maxAge=2592000)](https://github.com/djorg83/juicy)
[![license](https://img.shields.io/github/license/djorg83/juicy.svg?maxAge=2592000g)](https://github.com/djorg83/juicy)
[![GitHub stars](https://img.shields.io/github/stars/djorg83/juicy.svg?style=social&label=Star&maxAge=2592000)](https://github.com/djorg83/juicy)
[![Built with love](https://img.shields.io/badge/built%20with-love-ff69b4.svg)](https://img.shields.io/badge/built%20with-love-ff69b4.svg)

[![Powered by NodeJS](https://img.shields.io/badge/powered%20by-NodeJS-yellowgreen.svg)](https://nodejs.org/en/)
[![Powered by express](https://img.shields.io/badge/powered%20by-express-yellowgreen.svg)](https://expressjs.com/)
[![Powered by Monaco](https://img.shields.io/badge/powered%20by-Monaco-yellowgreen.svg)](https://microsoft.github.io/monaco-editor/)
[![Powered by Rainglow](https://img.shields.io/badge/powered%20by-Rainglow-yellowgreen.svg)](https://rainglow.io/)
[![Powered by react](https://img.shields.io/badge/powered%20by-react-yellowgreen.svg)](https://reactjs.org/)
[![Powered by webpack](https://img.shields.io/badge/powered%20by-webpack-yellowgreen.svg)](https://webpack.js.org/)
[![Powered by babel](https://img.shields.io/badge/powered%20by-babel-yellowgreen.svg)](https://babeljs.io/)
[![Powered by gulp](https://img.shields.io/badge/powered%20by-gulp-yellowgreen.svg)](https://gulpjs.com/)


# Table Of Contents
- [Why use Juicy?](#why)
- [Demo](#demo)
- [Running using global command](#global)
- [Running from within a program](#programatic)
- [Default Options](#default-options)
- [Options](#options)
- [Development](#development)
- [Author](#author)
- [Contributors](#contributors)



# <a name="why"></a> Why use Juicy?
- Juicy supports private npm packages. Just install `juicy-repl` globally and host it on your machine, tell it which packages to include, and in less than a minute you have a custom REPL running locally.
- Flow. Juicy supports [Flow](https://flow.org/) syntax, allowing you to copy and paste directly from your source without making syntax modifications.
- 300+ themes.  Juicy implements all themes from [Rainglow](https://rainglow.io/). Thanks to [Dayle Rees](https://daylerees.com) for building these themes.
- Same [editor](https://microsoft.github.io/monaco-editor/) as [VS Code](https://code.visualstudio.com/).
- Autocomplete/intellisense
- Easy sharing. Quickly create a link to what you're working on and share it with anyone.
- Save your work. Juicy allows you to pin your work and return to it at anytime without any need to signup or login.
- Last but not least, Juicy is just plain awesome!



# <a name="demo"></a> Demo
[juicy-js.com](http://juicy-js.com)


# <a name="global"></a> Running using global command


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


# <a name="programatic"></a> Running from within a program


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
const juicyOptions = { ... };

startRepl(juicyOptions);
```



# <a name="default-options"></a> Default Options

``` javascript
{
    packages: [
        'ramda',
        'joi',
        'lodash',
        'bluebird',
        'moment',
        'uuid'
    ],
    aliases: {
        ramda: [
            'R',
            'Ramda'
        ],
        lodash: [
            '_'
        ],
        bluebird: [
            'Promise'
        ]
    },
    configPath: null,
    port: 3000,
    detach: true,
    processTitle: 'juicy-repl',
    replPageTitle: 'Juicy REPL',
    gaid: null,
    hideHeader: false,
    spinnerPath: null,
    spinnerBgColor: null,
    faviconPath: null,
    headerLogoPath: null,
    headerTitle: null,
    headerSubtitle: 'A JavaScript REPL that feels like an IDE',
    headerColor: null,
    headerFontColor: null
};
```


# <a name="options"></a> Options

- [packages](#packages)
- [aliases](#aliases)
- [configPath](#configPath)
- [port](#port)
- [detach](#detach)
- [processTitle](#processTitle)
- [replPageTitle](#replPageTitle)
- [gaid](#gaid)
- [hideHeader](#hideHeader)
- [spinnerPath](#spinnerPath)
- [spinnerBgColor](#spinnerBgColor)
- [faviconPath](#faviconPath)
- [headerLogoPath](#headerLogoPath)
- [headerTitle](#headerTitle)
- [headerSubtitle](#headerSubtitle)
- [headerColor](#headerColor)
- [headerFontColor](#headerFontColor)


## <a name="packages"></a> options.packages

**Type:** `Array<String>`

**Description:** A list of npm packages to include when building the REPL.


**Default value:**
``` javascript
[
    'ramda',
    'joi',
    'lodash',
    'bluebird',
    'moment',
    'uuid'
]
```



----


## <a name="aliases"></a> options.aliases

**Type:** `Object<String, Array<String>>`

**Description:** Specify one or more aliases to expose as global variables for the packages.


**Default value:**
``` javascript
{
    ramda: [
        'R',
        'Ramda'
    ],
    lodash: [
        '_'
    ],
    bluebird: [
        'Promise'
    ]
}
```



----


## <a name="configPath"></a> options.configPath

**Type:** `String`

**Description:** Absolute path to config file.

**Default value:** `null`


**Command Line:** `--configPath '~/REPL_CONFIG.json'`


----


## <a name="port"></a> options.port

**Type:** `Number`

**Description:** The port number the REPL server will be exposed on.

**Default value:** `3000`


**Command Line:** `--port 80`


----


## <a name="detach"></a> options.detach

**Type:** `Boolean`

**Description:** If true, then the REPL server will detach into a child process and allow the main process to exit. Otheriwse the main process will suspend while the REPL server is running. It is suggested to set `detach` to `false` if using `nohup` or a process manager such as `forever` or `pm2`.

**Default value:** `true`


**Command Line:** `--detach false`


----


## <a name="processTitle"></a> options.processTitle

**Type:** `String`

**Description:** The `process.title` for the REPL server process.

**Default value:** `'juicy-repl'`


**Command Line:** `--processTitle 'my-custom-repl'`


----


## <a name="replPageTitle"></a> options.replPageTitle

**Type:** `String`

**Description:** The `document.title` for the REPL browser app.

**Default value:** `'Juicy REPL'`


**Command Line:** `--replPageTitle 'My REPL'`


----


## <a name="gaid"></a> options.gaid

**Type:** `String`

**Description:** Google Analytics ID. If set, then google analytics script is added to the page.

**Default value:** `null`


**Command Line:** `--gaid 'UA-112996224-1'`


----


## <a name="hideHeader"></a> options.hideHeader

**Type:** `Boolean`

**Description:** If true, then the header of the REPL will be hidden.

**Default value:** `false`


**Command Line:** `--hideHeader true`


----


## <a name="spinnerPath"></a> options.spinnerPath

**Type:** `String`

**Description:** Set to absolute path of image to loading spinner.

**Default value:** `null`


**Command Line:** `--spinnerPath '/Users/myuser/images/spinner.gif'`


----


## <a name="spinnerBgColor"></a> options.spinnerBgColor

**Type:** `String`

**Description:** If set, then the spinner will have a circular background filled with this color

**Default value:** `null`


**Command Line:** `--spinnerBgColor '#FFFFFF'`


----


## <a name="faviconPath"></a> options.faviconPath

**Type:** `String`

**Description:** Set to absolute path of image to override the favicon.

**Default value:** `null`


**Command Line:** `--faviconPath '/Users/myuser/images/favicon.ico'`


----


## <a name="headerLogoPath"></a> options.headerLogoPath

**Type:** `String`

**Description:** Set to absolute path of image to override logo in header.

**Default value:** `null`


**Command Line:** `--headerLogoPath '/Users/myuser/images/my-repl-logo.png'`


----


## <a name="headerTitle"></a> options.headerTitle

**Type:** `String`

**Description:** Overrides the title in the header. Use 'none' to hide the title.

**Default value:** `null`


**Command Line:** `--headerTitle 'My REPL'`


----


## <a name="headerSubtitle"></a> options.headerSubtitle

**Type:** `String`

**Description:** The subtitle in the header. Use 'none' to hide the subtitle.

**Default value:** `'A JavaScript REPL that feels like an IDE'`


**Command Line:** `--headerSubtitle 'powered by Juicy'`


----


## <a name="headerColor"></a> options.headerColor

**Type:** `String`

**Description:** If set, overrides the backgorund color of the header.

**Default value:** `null`


**Command Line:** `--headerColor '#FF0000'`


----


## <a name="headerFontColor"></a> options.headerFontColor

**Type:** `String`

**Description:** If set, overrides the font color of the header.

**Default value:** `null`


**Command Line:** `--headerFontColor '#FFFFFF'`


----



# <a name="development"></a> Development
``` bash
git clone https://github.com/djorg83/juicy
cd juicy
yarn dev
```



# <a name="author"></a> Author

[Daniel Jorgensen](mailto:<djorg386@gmail.com>)



# <a name="contributors"></a> Contributors

- [Daniel Jorgensen](mailto:djorg386@gmail.com)
- [Ricardo Spear](mailto:spear.ricardo@gmail.com)


