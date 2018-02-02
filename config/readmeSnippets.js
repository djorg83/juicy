/* eslint-disable max-len */

const R = require('ramda');
const pkg = require('../package.json');
const poweredByBadges = require('../config/poweredBy');
const defaultOptions = require('../lib/app/defaultOptions');
const options = require('../config/options.json');

const [first, last, email] = pkg.author.split(' ');
const contributorNames = pkg.contributors.map(({ name, email }) => `- [${name}](mailto:${email})`);

const genericBadges = require('../config/badges')({
    npmPackageName: 'juicy-repl',
    gitRepo: 'djorg83/juicy',
});

const downloadsImage = {
    label: 'NPM',
    imgUrl: `https://nodei.co/npm/${pkg.name}.png?downloads=true&stars=true`,
    link: `https://nodei.co/npm/${pkg.name}/`,
};

const codeBlock = '```';

const asArray = R.when(R.pipe(R.is(Array), R.not), R.of);

const jsonToString = (json) => JSON.stringify(json, null, 4).replace(/"(.*)":/g, '$1:').replace(/"/g, "'");

const imageLink = ({ label, imgUrl, link }) => `[![${label}](${imgUrl})](${link}})`;

const packageName = `# ${pkg.name}`;
const description = `${pkg.description}`;
const downloads = imageLink(downloadsImage);
const badges = genericBadges.map(imageLink);
const poweredBy = poweredByBadges.map(imageLink);

const tableOfContents = `
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
`;

const whyUseJuicy = `
# <a name="why"></a> Why use Juicy?
- Juicy supports private npm packages. Just install \`juicy-repl\` globally and host it on your machine, tell it which packages to include, and in less than a minute you have a custom REPL running locally.
- Flow. Juicy supports [Flow](https://flow.org/) syntax, allowing you to copy and paste directly from your source without making syntax modifications.
- 300+ themes.  Juicy implements all themes from [Rainglow](https://rainglow.io/). Thanks to [Dayle Rees](https://daylerees.com) for building these themes.
- Same [editor](https://microsoft.github.io/monaco-editor/) as [VS Code](https://code.visualstudio.com/).
- Autocomplete/intellisense
- Easy sharing. Quickly create a link to what you're working on and share it with anyone.
- Save your work. Juicy allows you to pin your work and return to it at anytime without any need to signup or login.
- Last but not least, Juicy is just plain awesome!
`;

const demo = `
# <a name="demo"></a> Demo
[juicy-js.com](http://juicy-js.com)
`;

const runGlobal = '# <a name="global"></a> Running using global command';

const installGlobal = `
Install ${pkg.name}
${codeBlock} bash
# with npm
npm install -g ${pkg.name}

# with yarn
yarn global add ${pkg.name}
${codeBlock}
`;

const globalExample1 = `
Example 1: out of the box quick start
${codeBlock} bash
juicy
${codeBlock}
`;

const globalExample2 = `
Example 2: with command line args
${codeBlock} bash
juicy --port 80 --detach false --processTitle "custom-repl" --replPageTitle "My Custom REPL" --hideHeader true
${codeBlock}
`;

const globalExample3 = `
Example 3: with config file
${codeBlock} bash
juicy --config "~/REPL_CONFIG.json"
${codeBlock}
`;

const globalExample4 = `
Example 4: with config file added environment variables
${codeBlock} bash
# add to ~/.bash_profile
export JUICY_CONFIG=~/REPL_CONFIG.json
${codeBlock}
${codeBlock} bash
juicy
${codeBlock}
`;

const runningWithinProgram = '# <a name="programatic"></a> Running from within a program';

const install = `
Install ${pkg.name}
${codeBlock} bash
# with npm
npm install --save ${pkg.name}

# with yarn
yarn add ${pkg.name}
${codeBlock}
`;

const runProgramaticExample = `
${codeBlock} javascript
const startRepl = require('${pkg.name}');

// supply any, all, or no options
const juicyOptions = { ... };

startRepl(juicyOptions);
${codeBlock}
`;

const defaultConfig = `
# <a name="default-options"></a> Default Options

${codeBlock} javascript
${jsonToString(defaultOptions)};
${codeBlock}
`;

const development = `
# <a name="development"></a> Development
${codeBlock} bash
git clone https://github.com/djorg83/juicy
cd juicy
yarn dev
${codeBlock}
`;

const author = `
# <a name="author"></a> Author

[${first} ${last}](mailto:${email})
`;


const contributors = `
# <a name="contributors"></a> Contributors

${contributorNames.join('\n')}
`;

const optionsTitle = '# <a name="options"></a> Options';

const optionsLinks = options.map(({ name }) => `- [${name}](#${name})`);

const makeCliExample = (name, value) => {
    if (!value) {
        return '';
    }
    return `**Command Line:** \`--${name} ${value}\`\n\n`;
};

const makeDefaultValue = (value) => {
    if (R.is(Array, value) || R.is(Object, value)) {
        return `
**Default value:**
${codeBlock} javascript
${jsonToString(value)}
${codeBlock}

`;
    }
    if (R.is(String, value)) {
        return `**Default value:** \`'${value}'\`\n\n`;
    }
    return `**Default value:** \`${value}\`\n\n`;
};

const optionDocs = options.map(({
    name, description, defaultValue, type, cliExample = null,
}) => `
## <a name="${name}"></a> options.${name}

**Type:** \`${type}\`

**Description:** ${description}

${makeDefaultValue(defaultValue)}
${makeCliExample(name, cliExample)}
----
`);

module.exports = [
    packageName,
    description,
    downloads,
    badges,
    poweredBy,
    tableOfContents,
    whyUseJuicy,
    demo,
    runGlobal,
    installGlobal,
    globalExample1,
    globalExample2,
    globalExample3,
    globalExample4,
    runningWithinProgram,
    install,
    runProgramaticExample,
    defaultConfig,
    optionsTitle,
    optionsLinks,
    optionDocs,
    development,
    author,
    contributors,
].map(asArray);
