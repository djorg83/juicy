const React = require('react');
const PropTypes = require('prop-types');
const JuicyLogo = require('./JuicyLogo');

const JuicySpinner = ({ size, color }) => (
    <div
        style={{
            position: 'relative',
            display: 'inline-block',
            height: size,
            width: size,
        }}
    >
        <div
            style={{
                position: 'absolute',
                height: size,
                width: size / 2,
                backgroundColor: color,
                borderTopLeftRadius: `${size * 2}px`,
                borderBottomLeftRadius: `${size * 2}px`,
                transformOrigin: 'center right',
                transform: 'rotate(-30deg)',
            }}
        />
        <div
            style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: `${size * 2}px`,
                backgroundColor: color,
                textAlign: 'center',
                animation: 'spin 3s linear infinite',
            }}
        >
            <JuicyLogo style={{ width: size, height: size }} />
        </div>
    </div>
);

JuicySpinner.propTypes = {
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
};

module.exports = JuicySpinner;
