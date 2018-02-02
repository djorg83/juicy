const shieldsIO = 'https://img.shields.io';

const items = [
    { label: 'NodeJS', link: 'https://nodejs.org/en/' },
    { label: 'express', link: 'https://expressjs.com/' },
    { label: 'Monaco', link: 'https://microsoft.github.io/monaco-editor/' },
    { label: 'Rainglow', link: 'https://rainglow.io/' },
    { label: 'react', link: 'https://reactjs.org/' },
    { label: 'webpack', link: 'https://webpack.js.org/' },
    { label: 'babel', link: 'https://babeljs.io/' },
    { label: 'gulp', link: 'https://gulpjs.com/' },
];

module.exports = items.map(({ label, link }) => ({
    label: `Powered by ${label}`,
    imgUrl: `${shieldsIO}/badge/powered%20by-${label}-yellowgreen.svg`,
    link,
}));
