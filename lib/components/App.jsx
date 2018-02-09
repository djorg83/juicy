const React = require('react');
const autobind = require('react-autobind');
const R = require('ramda');
const _ = require('lodash');
const Header = require('./Header');
const Footer = require('./Footer');
const Repl = require('./Repl');
const Sidebar = require('./Sidebar');
const Loading = require('./Loading');
const MONACO_THEMES = require('../constants/monaco-themes');

const headerHeight = 50;
const footerHeight = 20;
const sidebarWidth = 200;
const REPL_ID = 'repl';

const {
    packageNames,
    aliases: packageAliases,
    packages,
    packageMethods,
    packageVersions,
    hideHeader,
    headerLogoFilename,
    headerTitle,
    headerSubtitle,
    headerColor,
    headerFontColor,
    spinnerFilename,
    spinnerBgColor,
} = window.JUICY_REPL_CONFIG;

// eslint-disable-next-line import/no-unresolved
const definedThemes = require('../../dist/repl-themes.js');

const headerFooterHeight = hideHeader ? footerHeight : headerHeight + footerHeight;

const fullHeight = {
    height: `calc(100% - ${headerFooterHeight}px)`,
    position: 'relative',
    top: hideHeader ? 0 : `${headerHeight}px`,
};

const replStyle = Object.assign({}, fullHeight, { float: 'left', width: `calc(100% - ${sidebarWidth}px)` });
const sidebarStyle = Object.assign({}, fullHeight, { width: `${sidebarWidth}px` });

const autocomplete = require('../utils/autocomplete')({ packageMethods, packageAliases });

const makeThemeList = R.pipe(
    R.flatten,
    R.uniq,
    R.map(R.toLower),
    R.sort((a, b) => (a > b ? 1 : -1)),
    R.map(R.applySpec({
        label: _.startCase,
        value: R.identity,
        dark: R.pipe(R.anyPass([R.equals('vs'), R.test(/light/)]), R.not),
    }))
);

const monacoThemes = R.values(MONACO_THEMES);
const themes = makeThemeList([monacoThemes, definedThemes]);
const autocompleteSuggestions = autocomplete.getSuggestions();

// expose globals
packageNames.forEach((packageName) => {
    const aliases = packageAliases[packageName];
    const lib = packages[packageName];
    aliases.forEach((alias) => {
        // eslint-disable-next-line no-console
        console.log(`Adding alias window.${alias} for package ${packageName}`);
        window[alias] = lib;
    });
});

class App extends React.Component {
    constructor(props) {
        super(props);
        autobind(this);

        const cache = require('../utils/cache')(REPL_ID);

        this.state = {
            cache,
            selectedTheme: cache.getTheme() || 'peacocks-in-space',
            loading: false,
            stringColor: '#fff',
        };
    }

    onSelectTheme(selectedTheme) {
        this.state.cache.setTheme(selectedTheme);
        this.setState(() => ({ selectedTheme }));
    }

    onStringColorChange(stringColor) {
        this.setState(() => ({ stringColor }));
    }

    setLoading(loading) {
        this.setState(() => ({ loading }));
    }

    render() {
        const { loading } = this.state;
        const color = loading && headerColor ? headerColor : this.state.stringColor;
        return (
            <div style={{ height: '100%' }}>
                {loading && (
                    <Loading
                        color={color}
                        spinnerFilename={spinnerFilename}
                        spinnerBgColor={spinnerBgColor}
                    />
                )}
                {!hideHeader && (
                    <Header
                        color={color}
                        headerColor={headerColor || undefined}
                        headerLogoFilename={headerLogoFilename || undefined}
                        headerTitle={headerTitle || undefined}
                        headerSubtitle={headerSubtitle || undefined}
                        headerFontColor={headerFontColor || undefined}
                    />
                )}
                <Repl
                    id={REPL_ID}
                    style={replStyle}
                    theme={this.state.selectedTheme}
                    autocompleteSuggestions={autocompleteSuggestions}
                    onStringColorChange={this.onStringColorChange}
                    cache={this.state.cache}
                />
                <Sidebar
                    style={sidebarStyle}
                    selectedTheme={this.state.selectedTheme}
                    onSelectTheme={this.onSelectTheme}
                    packageVersions={packageVersions}
                    packageAliases={packageAliases}
                    setLoading={this.setLoading}
                    themes={themes}
                    stringColor={color}
                    cache={this.state.cache}
                />
                <Footer />
            </div>
        );
    }
}

module.exports = App;
