const React = require('react');
const PropTypes = require('prop-types');
const autobind = require('react-autobind');
const FontAwesome = require('react-fontawesome');
const shortenUrl = require('../utils/shortenUrl');

class EditorHeader extends React.Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = {
            shareLink: '',
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.shareLink !== this.state.shareLink) {
            this.shareLinkInput.focus();
            this.shareLinkInput.select();
        }
    }

    share() {
        let url = window.location.href;
        const time = `t=${Date.now()}`;
        url += url.includes('?') ? `&${time}` : `?${time}`;

        return shortenUrl(url).then((shareLink) => this.setState(() => ({ shareLink })));
    }

    render() {
        return (
            <header style={{ background: '#44475a', height: '33px' }}>

                <h3 style={{
                    color: '#f8f8f2',
                    fontWeight: 800,
                    fontSize: '1em',
                    lineHeight: 1.15,
                    padding: '.5em .5em .4em 2em',
                    margin: 0,
                    display: 'inline-block',
                    textTransform: 'uppercase',
                }}
                >
                    {this.props.title}
                </h3>

                {this.props.editable && (
                    <button onClick={this.props.clearEditor} className="repl-btn repl-btn-danger">
                        Clear
                    </button>
                )}

                {this.props.shareable && (
                    <button onClick={this.share} className="repl-btn">
                        Share
                    </button>
                )}

                {this.state.shareLink && (
                    <input
                        style={{
                            color: '#44475a',
                            border: 'none',
                            borderRadius: 1,
                            fontSize: '1em',
                            verticalAlign: 'middle',
                            padding: '.2em',
                            outline: 'none',
                            position: 'relative',
                            top: '-2px',
                            width: '175px',
                        }}
                        ref={(input) => { this.shareLinkInput = input; }}
                        value={this.state.shareLink}
                        onChange={() => {}}
                        className="repl-url-out"
                        type="text"
                    />
                )}

                {this.props.editable && (
                    <div style={{ float: 'right', marginRight: 15 }}>
                        <button onClick={this.props.onClickRun} className="repl-btn" title="Run">
                            <FontAwesome name="play" style={{ fontSize: 12 }} />
                        </button>
                        <span style={{ marginLeft: 10 }}>
                            <input
                                id="autorun"
                                type="checkbox"
                                onChange={this.props.onChangeAutoRun}
                                checked={this.props.autoRun}
                            />
                            <span
                                style={{
                                    fontWeight: 'normal',
                                    marginLeft: 5,
                                    color: '#fff',
                                }}
                            >
                                Auto Run
                            </span>
                        </span>
                    </div>
                )}
            </header>
        );
    }
}

EditorHeader.propTypes = {
    title: PropTypes.string.isRequired,
    clearEditor: PropTypes.func,
    shareable: PropTypes.bool,
    editable: PropTypes.bool,
    autoRun: PropTypes.bool,
    onClickRun: PropTypes.func,
    onChangeAutoRun: PropTypes.func,
};

EditorHeader.defaultProps = {
    editable: false,
    shareable: false,
    autoRun: true,
    clearEditor: () => {},
    onClickRun: () => {},
    onChangeAutoRun: () => {},
};

module.exports = EditorHeader;
