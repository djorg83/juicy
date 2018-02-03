import MonacoEditor from 'react-monaco-editor/lib/index';

const React = require('react');
const PropTypes = require('prop-types');
const autobind = require('react-autobind');
const R = require('ramda');
const fetchTheme = require('../utils/fetchTheme');
const rainglowToMonaco = require('../utils/rainglowToMonaco');
const EditorHeader = require('./EditorHeader');
const MONACO_THEMES = require('../constants/monaco-themes');

const monacoThemes = R.values(MONACO_THEMES);
const fetchedThemes = [];

const baseEditorStyle = {
    height: '100%',
    fontSize: 14,
    float: 'left',
    width: '50%',
};

class Editor extends React.Component {
    constructor(props) {
        super(props);
        autobind(this);
        window.addEventListener('resize', this.resizeEditor, { passive: true });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.theme !== this.props.theme) {
            this.setTheme(nextProps.theme);
        }
    }

    setTheme(themeName) {
        if (!monacoThemes.includes(themeName) && !fetchedThemes.includes(themeName)) {
            fetchTheme(themeName).then((theme) => {
                fetchedThemes.push(themeName);
                const monacoTheme = rainglowToMonaco(theme);
                const stringRule = monacoTheme.rules.find((r) => r.token === 'string') || {};
                this._monaco.editor.defineTheme(themeName, monacoTheme);
                this._monaco.editor.setTheme(themeName);
                this.props.onStringColorChange(`#${stringRule.foreground || 'fff'}`);
            });
            return;
        }
        this._monaco.editor.setTheme(themeName);
    }

    editorDidMount(editor, monaco) {
        this._monaco = monaco;
        this._editor = editor;

        if (this.props.editable && this.props.autocompleteSuggestions) {
            monaco.languages.registerCompletionItemProvider('javascript', {
                provideCompletionItems: () => this.props.autocompleteSuggestions.map((suggestion) => ({
                    label: suggestion,
                    kind: monaco.languages.CompletionItemKind.Text,
                })),
            });
        }
        this.setTheme(this.props.theme);
    }

    resizeEditor() {
        if (this._editor) {
            this._editor.layout();
        }
    }

    render() {
        return (
            <div style={Object.assign({}, baseEditorStyle, this.props.style)}>
                <EditorHeader {...this.props} />
                <div style={{ height: 'calc(100% - 33px)' }}>
                    <MonacoEditor
                        language="javascript"
                        theme={this.props.theme}
                        value={this.props.value}
                        options={{
                            selectOnLineNumbers: true,
                            readOnly: !this.props.editable,
                            rulers: this.props.editable ? [80] : [],
                            minimap: {
                                enabled: false,
                            },
                        }}
                        onChange={this.props.onEditorEmitValue}
                        editorDidMount={this.editorDidMount}
                    />
                </div>
            </div>
        );
    }
}

Editor.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string,
    theme: PropTypes.string.isRequired,
    editable: PropTypes.bool,
    shareable: PropTypes.bool,
    autoRun: PropTypes.bool,
    onEditorEmitValue: PropTypes.func,
    clearEditor: PropTypes.func,
    style: PropTypes.shape({}),
    autocompleteSuggestions: PropTypes.arrayOf(PropTypes.string),
    onStringColorChange: PropTypes.func,
    onClickRun: PropTypes.func,
    onChangeAutoRun: PropTypes.func,
};

Editor.defaultProps = {
    editable: false,
    shareable: false,
    autoRun: true,
    style: {},
    value: '',
    autocompleteSuggestions: [],
    onStringColorChange: () => {},
    onEditorEmitValue: () => {},
    clearEditor: () => {},
    onClickRun: () => {},
    onChangeAutoRun: () => {},
};

module.exports = Editor;
