/* eslint-disable jsx-a11y/anchor-is-valid */

const React = require('react');
const PropTypes = require('prop-types');

const JuicyLogo = ({ style }) => (
    <div style={style}>
        <img src="./images/fruit-slice.png" alt="fruit-slice" width={style.width} />
    </div>
);

JuicyLogo.propTypes = {
    style: PropTypes.shape({
        width: PropTypes.number.isRequired,
    }),
};

JuicyLogo.defaultProps = {
    style: {
        width: 40,
    },
};

module.exports = JuicyLogo;
