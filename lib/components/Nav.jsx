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
        return (
            <div
                className="navbar navbar-inverse navbar-fixed-top"
                style={{ backgroundColor: this.state.animate ? '#d8f317' : this.props.color }}
                role="navigation"
            >
                <div className="navbar-header">
                    <a
                        href="https://github.com/djorg83/juicy"
                        className="navbar-left"
                        style={{ textDecoration: 'none' }}
                    >
                        <div
                            id="brand"
                            style={{ marginTop: 5 }}
                            onMouseEnter={this.mouseEnter}
                            onMouseLeave={this.mouseLeave}
                        >
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
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 7,
                                    left: 50,
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: 'scramble',
                                        marginLeft: 10,
                                        position: 'relative',
                                        top: 5,
                                        fontSize: 20,
                                        color: '#333',
                                    }}
                                >
                                    Juicy
                                </span>
                                &nbsp;
                                <span style={{ fontSize: 12, color: '#333' }} >
                                    A JavaScript REPL with themes for days
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

Nav.propTypes = {
    color: PropTypes.string.isRequired,
};

module.exports = Nav;
