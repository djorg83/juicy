/* eslint-disable jsx-a11y/anchor-is-valid */

const React = require('react');
const autobind = require('react-autobind');
const PropTypes = require('prop-types');
const JuicyLogo = require('./JuicyLogo');
const JuicySpinner = require('./JuicySpinner');

class Nav extends React.Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = { animate: false };
    }

    mouseEnter() {
        this.setState({ animate: true });
    }

    mouseLeave() {
        this.setState({ animate: false });
    }

    render() {
        const defaultColor = this.state.animate ? '#d8f317' : this.props.color;
        const backgroundColor = this.props.headerColor || defaultColor;
        return (
            <div
                className="navbar navbar-inverse navbar-fixed-top"
                style={{ backgroundColor, color: this.props.headerFontColor }}
                role="navigation"
            >
                <div className="navbar-header">
                    <a
                        href="https://github.com/djorg83/juicy"
                        className="navbar-left"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <div
                            style={{ marginTop: 5 }}
                            onMouseEnter={this.mouseEnter}
                            onMouseLeave={this.mouseLeave}
                        >
                            {this.props.headerLogoFilename ? (
                                <img
                                    src={`/images/dist/${this.props.headerLogoFilename}`}
                                    alt="logo"
                                    style={{
                                        height: 30,
                                        position: 'relative',
                                        top: 3,
                                    }}
                                />
                            ) : (
                                <div>
                                    {this.state.animate ? (
                                        <JuicySpinner size={40} color={this.props.color} />
                                    ) : (
                                        <JuicyLogo
                                            style={{
                                                display: 'inline-block',
                                                width: 40,
                                                height: 40,
                                            }}
                                        />
                                    )}
                                </div>
                            )}
                            {this.props.headerTitle !== 'none' && (
                                <div
                                    style={this.props.headerTitle ? {
                                        position: 'relative',
                                        top: 4,
                                        display: 'inline-block',
                                    } : {
                                        position: 'absolute',
                                        top: 7,
                                        left: 50,
                                    }}
                                >
                                    <span
                                        style={{
                                            marginLeft: 10,
                                            position: 'relative',
                                            top: 5,
                                            fontSize: 20,
                                        }}
                                    >
                                        {this.props.headerTitle ? (
                                            <span
                                                style={{
                                                    top: -2,
                                                    position: 'relative',
                                                    marginRight: 5,
                                                }}
                                            >
                                                {this.props.headerTitle}
                                            </span>
                                        ) : (
                                            <span style={{ fontFamily: 'scramble' }}>Juicy</span>
                                        )}
                                    </span>
                                    &nbsp;
                                    {this.props.headerSubtitle !== 'none' && (
                                        <span style={{ fontSize: 12 }} >
                                            {this.props.headerSubtitle}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

Nav.propTypes = {
    color: PropTypes.string.isRequired,
    headerColor: PropTypes.string,
    headerFontColor: PropTypes.string,
    headerLogoFilename: PropTypes.string,
    headerTitle: PropTypes.string,
    headerSubtitle: PropTypes.string,
};

Nav.defaultProps = {
    headerColor: null,
    headerLogoFilename: null,
    headerTitle: null,
    headerSubtitle: 'none',
    headerFontColor: '#333',
};

module.exports = Nav;
