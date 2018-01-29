const React = require('react');
const PropTypes = require('prop-types');
const JuicySpinner = require('./JuicySpinner');
const Drips = require('./Drips');

const size = 240;

const Loading = ({ color }) => (
    <div>
        <Drips />
        <div
            style={{
                position: 'absolute',
                top: `calc(50% - ${size / 2}px)`,
                left: `calc(50% - ${size / 2}px)`,
                zIndex: '10000',
            }}
        >
            <JuicySpinner size={size} color={color} />
        </div>
    </div>
);

Loading.propTypes = {
    color: PropTypes.string.isRequired,
};

module.exports = Loading;
