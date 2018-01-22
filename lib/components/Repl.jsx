const React = require('react');
const PropTypes = require('prop-types');
const autobind = require('react-autobind');
const R = require('ramda');
const Editor = require('./Editor');
const logger = require('../utils/logger');
const beautify = require('../utils/beautify');
const babelify = require('../utils/babelify');

const baseReplStyle = {
};

const baseInputStyle = {
    width: '60%',
};

const baseOutputStyle = {
    width: '40%',
    borderLeft: '2px solid #44475a',
};

class Repl extends React.Component {
    constructor(props) {
        super(props);
        autobind(this);

        const queryParams = require('../utils/queryParams')(this.props.id);
        const deprecated2 = queryParams.getRawParam('primary-snippet');
        const deprecated1 = queryParams.getRawParam('snippet');

        const inputValue = queryParams.getSnippet() || deprecated2 || deprecated1 || '';

        queryParams.setSnippet(inputValue);

        // remove deprecated params
        queryParams.removeRawParam('primary-snippet');
        queryParams.removeRawParam('snippet');

        // remove timestamp
        queryParams.removeRawParam('t');

        const autoRun = this.props.cache.getAutoRun() || true;

        this.state = {
            queryParams,
            inputValue,
            outputValue: null,
            hasChanged: true,
            autoRun: autoRun === 'true' || autoRun === true,
            timer: null,
        };
    }

    componentDidMount() {
        this.startTimer();
    }

    onInputEmitValue(value) {
        const safeValue = value || '';
        if (safeValue !== this.state.inputValue) {
            this.setState(
                () => ({ inputValue: safeValue, hasChanged: true }),
                () => {
                    this.state.queryParams.setSnippet(this.state.inputValue);
                    this.startTimer();
                }
            );
        } else {
            this.setState(() => ({ hasChanged: false }), this.startTimer);
        }
    }

    setOutputValue(value) {
        const logsValue = logger.getLogs();
        const outputValue = value && beautify(value);

        let output;

        if (!R.isNil(outputValue)) {
            output = logsValue + outputValue;
        } else if (!R.isEmpty(logsValue) && !R.isNil(logsValue)) {
            output = logsValue;
        } else {
            output = '';
        }

        this.setState(() => ({ outputValue: output }));
    }

    clearInput() {
        this.state.queryParams.setSnippet('');
        this.setState(() => ({ inputValue: '', outputValue: '' }));
    }

    startTimer() {
        this.stopTimer(() => {
            if (this.state.autoRun) {
                const timer = setInterval(this.evaluate.bind(this), 1500);
                this.setState(() => ({ timer }));
            }
        });
    }

    stopTimer(done = () => {}) {
        if (this.state.timer) {
            clearInterval(this.state.timer);
            this.setState(() => ({ timer: null }), done);
        } else {
            done();
        }
    }

    toggleAutoRun() {
        this.setState(
            () => ({ autoRun: !this.state.autoRun }),
            () => {
                this.props.cache.setAutoRun(this.state.autoRun);
                this.startTimer();
            }
        );
    }

    evaluate(force) {
        if (force || this.state.hasChanged) {
            this.setState(
                () => ({ hasChanged: false }),
                () => babelify(this.state.inputValue)
                    .then((babelOutput) => {
                        logger.clearLogs();
                        // eslint-disable-next-line no-eval
                        let value = R.tryCatch(eval, R.prop('message'))(babelOutput);

                        if (!value || !value.then) {
                            value = Promise.resolve(value);
                        }

                        return value;
                    })
                    .then((value) => value.replace('use strict', ''))
                    .then(this.setOutputValue)
            );
        }
    }

    render() {
        return (
            <div style={Object.assign({}, baseReplStyle, this.props.style)}>
                <Editor
                    title={this.props.inputTitle}
                    editable
                    shareable
                    autoRun={this.state.autoRun}
                    value={this.state.inputValue}
                    onEditorEmitValue={this.onInputEmitValue}
                    clearEditor={this.clearInput}
                    theme={this.props.theme}
                    autocompleteSuggestions={this.props.autocompleteSuggestions}
                    style={Object.assign({}, baseInputStyle, this.props.inputStyle)}
                    onStringColorChange={this.props.onStringColorChange}
                    onClickRun={() => this.evaluate(true)}
                    onChangeAutoRun={this.toggleAutoRun}
                />
                <Editor
                    title={this.props.outputTitle}
                    value={this.state.outputValue}
                    theme={this.props.theme}
                    style={Object.assign({}, baseOutputStyle, this.props.outputStyle)}
                />
            </div>
        );
    }
}

Repl.propTypes = {
    id: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    inputTitle: PropTypes.string,
    outputTitle: PropTypes.string,
    style: PropTypes.shape({}),
    inputStyle: PropTypes.shape({}),
    outputStyle: PropTypes.shape({}),
    autocompleteSuggestions: PropTypes.arrayOf(PropTypes.string),
    onStringColorChange: PropTypes.func,
    cache: PropTypes.shape({
        getAutoRun: PropTypes.func.isRequired,
        setAutoRun: PropTypes.func.isRequired,
    }).isRequired,
};

Repl.defaultProps = {
    inputTitle: 'Input',
    outputTitle: 'Output',
    style: {},
    inputStyle: {},
    outputStyle: {},
    autocompleteSuggestions: [],
    onStringColorChange: () => {},
};

module.exports = Repl;
