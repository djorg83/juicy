const React = require('react');
const PropTypes = require('prop-types');
const JuicySpinner = require('./JuicySpinner');
const Drips = require('./Drips');

const size = 240;
const customSpinnerHeight = 125;

const Loading = ({ color, spinnerFilename, spinnerBgColor }) => (
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
            {spinnerFilename ? (
                <div
                    style={{
                        backgroundColor: spinnerBgColor,
                        borderRadius: size,
                        height: size,
                        width: size,
                        textAlign: 'center',
                        paddingTop: ((size / 2) - (customSpinnerHeight / 2)),
                    }}
                >
                    <img height={customSpinnerHeight} src={`./images/dist/${spinnerFilename}`} alt="spinner" />
                </div>
            ) : (
                <JuicySpinner size={size} color={color} />
            )}

        </div>
    </div>
);

Loading.propTypes = {
    color: PropTypes.string.isRequired,
    spinnerFilename: PropTypes.string,
    spinnerBgColor: PropTypes.string,
};

Loading.defaultProps = {
    spinnerFilename: null,
    spinnerBgColor: null,
};

module.exports = Loading;
