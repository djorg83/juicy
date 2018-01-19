/* eslint-disable jsx-a11y/anchor-is-valid */

const React = require('react');
const PropTypes = require('prop-types');

const Nav = ({ color }) => (
    <div className="navbar navbar-inverse navbar-fixed-top" style={{ backgroundColor: color }} role="navigation">
        <div className="navbar-header">
            <a href="#" className="navbar-left">
                <img id="logo" src="./images/logo.png" alt="logo" />
            </a>
        </div>
    </div>
);

Nav.propTypes = {
    color: PropTypes.string.isRequired,
};

module.exports = Nav;
