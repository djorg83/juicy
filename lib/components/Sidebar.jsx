const React = require('react');
const PropTypes = require('prop-types');
const autobind = require('react-autobind');
const ThemeSelect = require('./ThemeSelect.jsx');
const Packages = require('./Packages.jsx');
const Pins = require('./Pins.jsx');

const baseStyle = {
    height: '100%',
    float: 'left',
    width: 150,
    color: '#fff',
    padding: 10,
};

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = {};
    }

    render() {
        return (
            <div style={Object.assign({}, baseStyle, this.props.style)}>
                <div style={{ marginBottom: 15 }}>
                    <ThemeSelect {...this.props} />
                </div>
                <hr />
                <div style={{ marginBottom: 15 }}>
                    <Packages {...this.props} />
                </div>
                <hr />
                <div style={{ marginBottom: 15 }}>
                    <Pins {...this.props} />
                </div>
            </div>
        );
    }
}

Sidebar.propTypes = {
    selectedTheme: PropTypes.string.isRequired,
    onSelectTheme: PropTypes.func.isRequired,
    packageVersions: PropTypes.shape({}).isRequired,
    packageAliases: PropTypes.shape({}).isRequired,
    style: PropTypes.shape({}),
    setLoading: PropTypes.func.isRequired,
    themes: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        dark: PropTypes.bool.isRequired,
    })).isRequired,
    stringColor: PropTypes.string.isRequired,
    cache: PropTypes.shape({
        savePin: PropTypes.func.isRequired,
        removePin: PropTypes.func.isRequired,
        getPins: PropTypes.func.isRequired,
    }).isRequired,
};

Sidebar.defaultProps = {
    style: {},
};

module.exports = Sidebar;
