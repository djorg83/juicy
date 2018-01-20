const React = require('react');
const PropTypes = require('prop-types');
const JuicyLogo = require('./JuicyLogo');

const size = 240;

const Loading = ({ color }) => (
    <div
        style={{
            position: 'absolute',
            top: `calc(50% - ${size / 2}px)`,
            left: `calc(50% - ${size / 2}px)`,
            zIndex: '10000',
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
            <JuicyLogo
                style={{
                    width: size,
                    height: size,
                // animation: 'spin 3s linear infinite',
                }}
            />
        </div>
    </div>
);

Loading.propTypes = {
    color: PropTypes.string.isRequired,
};

module.exports = Loading;
