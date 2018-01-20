/* eslint-disable jsx-a11y/anchor-is-valid */

const React = require('react');
const PropTypes = require('prop-types');
const JuicyLogo = require('./JuicyLogo');

const Nav = ({ color }) => (
    <div className="navbar navbar-inverse navbar-fixed-top" style={{ backgroundColor: color }} role="navigation">
        <div className="navbar-header">
            <a
                href="https://github.com/djorg83/juicy"
                className="navbar-left"
                style={{ textDecoration: 'none' }}
            >
                <div id="brand" style={{ marginTop: 5 }}>
                    <JuicyLogo
                        style={{
                            display: 'inline-block',
                            width: 40,
                            height: 40,
                            // animation: 'spin 5s linear infinite',
                        }}
                    />
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
            </a>
        </div>
    </div>
);

Nav.propTypes = {
    color: PropTypes.string.isRequired,
};

module.exports = Nav;
