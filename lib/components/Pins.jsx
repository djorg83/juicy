import SweetAlert from 'react-bootstrap-sweetalert';

const React = require('react');
const PropTypes = require('prop-types');
const autobind = require('react-autobind');
const FontAwesome = require('react-fontawesome');

const getUrl = () => new URL(window.location.href);
const getSearchParams = () => getUrl().searchParams;

const buttonStyle = { borderRadius: 3, width: 180, marginBottom: 5 };

class Pins extends React.Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = {
            prompt: null,
            newPinName: null,
            pins: [],
        };
    }

    componentDidMount() {
        this.loadPins();
    }

    onEnterPinName(newPinName) {
        this.setState(() => ({
            newPinName,
            prompt: null,
        }), this.savePin);
    }

    savePin() {
        const name = this.state.newPinName;
        const queryString = getSearchParams().toString();
        this.props.cache.savePin(name, queryString);

        this.hidePrompt();
        this.loadPins();
    }

    removePin(name) {
        this.props.cache.removePin(name);
        this.hidePrompt();
        this.loadPins();
    }

    hidePrompt() {
        this.setState(() => ({ prompt: null, newPinName: null }));
    }

    loadPins() {
        this.setState(() => ({ pins: this.props.cache.getPins() }));
    }

    promptNewPin() {
        this.setState(() => ({
            prompt: (
                <SweetAlert
                    type="input"
                    showCancel
                    title="Save New Pin"
                    style={{ color: '#666' }}
                    onConfirm={this.onEnterPinName}
                    onCancel={this.hidePrompt}
                    confirmBtnText="Save Pin"
                    cancelBtnText="Nope, just kidding"
                >
                    Enter a pin name:
                </SweetAlert>
            ),
        }));
    }

    promptRemovePin(name) {
        this.setState(() => ({
            prompt: (
                <SweetAlert
                    type="error"
                    showCancel
                    title="Are you sure?"
                    style={{ color: '#666' }}
                    onConfirm={() => this.removePin(name)}
                    onCancel={this.hidePrompt}
                    confirmBtnBsStyle="error"
                    confirmBtnText="Delete it!"
                    cancelBtnText="Nope, just kidding"
                >
                    This will delete the pin named:&nbsp;
                    <span style={{ color: '#ff5d38', fontWeight: 'bold' }}>
                        {name}
                    </span>
                    .
                </SweetAlert>
            ),
        }));
    }

    render() {
        return (
            <div>
                <span style={{ display: 'block', fontWeight: 'normal' }}>
                    <FontAwesome name="pin" />&nbsp;Pinned Snippets:&nbsp;
                </span>
                <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
                    {this.state.pins.map(({ name, queryString }) => (
                        <li
                            key={`pin-${name}`}
                            style={{ fontSize: 12, position: 'relative', left: 5 }}
                        >
                            <a href={`?${queryString}`} style={{ color: this.props.stringColor }}>
                                <FontAwesome name="thumbtack" style={{ color: '#d0d0d0' }} />&nbsp;{name}
                            </a>
                            <span style={{ float: 'right' }} >
                                <FontAwesome name="trash" onClick={() => this.promptRemovePin(name)} />
                            </span>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={this.promptNewPin}
                    className="btn btn-default"
                    style={Object.assign({ marginTop: 10 }, buttonStyle)}
                >
                    <FontAwesome name="save" />&nbsp;Save New Pin
                </button>

                {this.state.prompt != null && this.state.prompt}
            </div>
        );
    }
}

Pins.propTypes = {
    stringColor: PropTypes.string.isRequired,
    cache: PropTypes.shape({
        savePin: PropTypes.func.isRequired,
        removePin: PropTypes.func.isRequired,
        getPins: PropTypes.func.isRequired,
    }).isRequired,
};

module.exports = Pins;
