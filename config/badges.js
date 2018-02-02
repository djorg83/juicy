const shieldsIO = 'https://img.shields.io';

module.exports = ({
    npmPackageName,
    gitRepo,
}) => {
    const npmPackageUrl = `https://www.npmjs.com/package/${npmPackageName}`;
    const gitRepoUrl = `https://github.com/${gitRepo}`;

    return [
        {
            label: 'NPM version',
            imgUrl: `${shieldsIO}/npm/v/${npmPackageName}.svg`,
            link: npmPackageUrl,
        },
        {
            label: 'Downloads',
            imgUrl: `${shieldsIO}/npm/dm/${npmPackageName}.svg`,
            link: npmPackageUrl,
        },
        {
            label: 'David',
            imgUrl: `${shieldsIO}/david/${gitRepo}.svg?maxAge=2592000`,
            link: gitRepoUrl,
        },
        {
            label: 'devDependencies Status',
            imgUrl: `https://david-dm.org/${gitRepo}/dev-status.svg`,
            link: `https://david-dm.org/${gitRepo}?type=dev`,
        },
        {
            label: 'GitHub issues',
            imgUrl: `${shieldsIO}/github/issues/${gitRepo}.svg?maxAge=2592000`,
            link: gitRepoUrl,
        },
        {
            label: 'license',
            imgUrl: `${shieldsIO}/github/license/${gitRepo}.svg?maxAge=2592000g`,
            link: gitRepoUrl,
        },
        {
            label: 'GitHub stars',
            imgUrl: `${shieldsIO}/github/stars/${gitRepo}.svg?style=social&label=Star&maxAge=2592000`,
            link: gitRepoUrl,
        },
        {
            label: 'Built with love',
            imgUrl: `${shieldsIO}/badge/built%20with-love-ff69b4.svg`,
            link: `${shieldsIO}/badge/built%20with-love-ff69b4.svg`,
        },
    ];
};
