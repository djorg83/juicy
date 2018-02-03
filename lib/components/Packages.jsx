import SweetAlert from 'react-bootstrap-sweetalert';

const React = require('react');
const PropTypes = require('prop-types');
const autobind = require('react-autobind');
const FontAwesome = require('react-fontawesome');
const queryParams = require('../utils/queryParams');

const buttonStyle = { borderRadius: 3, width: 180, marginBottom: 5 };

const setPackages = (packages) => {
    const { searchParams } = new URL(window.location.href);
    searchParams.delete('packages');
    if (packages) {
        searchParams.append('packages', packages);
    }
    window.location = `${window.location.origin}?${searchParams.toString()}`;
};

const PromptInput = ({
    value,
    onChange,
    onKeyDown,
    label,
    placeholder,
}) => (
    <div className="form-group">
        <label style={{ fontSize: 15 }} htmlFor={label}>{label}</label>
        <input
            id={label}
            type="text"
            className="form-control"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    </div>
);

PromptInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
};

PromptInput.defaultProps = {
    value: '',
};

class Packages extends React.Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = {
            prompt: null,
            newPackage: '',
            alias: '',
            version: '',
        };
    }

    onChangePromptInput(fieldName, value) {
        this.setState(() => ({
            [fieldName]: value,
        }), this.promptAddPackage);
    }

    onInputKeyDown(e) {
        if (e.keyCode === 13) {
            this.confirmImportPackage();
            e.stopPropagation();
        }
    }

    hidePrompt(next) {
        if (typeof next !== 'function') {
            // eslint-disable-next-line no-param-reassign
            next = () => {};
        }
        this.setState(() => ({
            prompt: null,
            newPackage: '',
            alias: '',
            version: '',
        }), next);
    }

    importPackage() {
        this.props.setLoading(true);
        this.hidePrompt();

        let npmPackage = this.state.newPackage.toLowerCase().trim();

        const existingPackages = Object.keys(this.props.packageAliases)
            .filter((packageName) => {
                return packageName.toLowerCase() !== npmPackage;
            })
            .map((packageName) => {
                const aliases = this.props.packageAliases[packageName].filter((alias) => {
                    return alias !== packageName;
                }).join(',');

                const version = this.props.packageVersions[packageName];
                return `${packageName}!${aliases}!${version}`;
            });

        npmPackage += this.state.alias ? `!${this.state.alias.trim()}` : '!';
        npmPackage += this.state.version ? `!${this.state.version.trim()}` : '';

        const allPackages = [...existingPackages, npmPackage];
        const allPackagesString = allPackages.join('|');

        setPackages(allPackagesString);
    }

    confirmImportPackage() {
        if (this.state.newPackage) {
            this.setState(() => ({
                prompt: (
                    <SweetAlert
                        showCancel
                        title="Import New Package"
                        style={{ color: '#666' }}
                        onConfirm={this.importPackage}
                        onCancel={this.hidePrompt}
                        confirmBtnText="Import Now"
                        cancelBtnText="Nope, just kidding"
                    >
                        <div style={{ fontSize: 14, marginTop: 20 }}>
                            You wish to import&nbsp;
                            <span style={{ color: '#ff5d38', fontWeight: 'bold' }}>
                                {this.state.newPackage}
                            </span>
                            {this.state.version && (
                                <span>
                                    &nbsp;version&nbsp;
                                    <span style={{ color: '#ff5d38', fontWeight: 'bold' }}>
                                        {this.state.version}
                                    </span>
                                </span>
                            )}
                            {this.state.alias && (
                                <span>
                                    &nbsp;with aliases&nbsp;(
                                    <span style={{ color: '#ff5d38', fontWeight: 'bold' }}>
                                        {this.state.alias.split(',').join(', ')}
                                    </span>
                                    )
                                </span>
                            )}
                            .
                        </div>

                        <div style={{
                            color: '#e8bb00',
                            fontWeight: 'bold',
                            marginTop: 15,
                            fontSize: 20,
                        }}
                        >
                            <FontAwesome name="exclamation-triangle" />&nbsp;This can take up to one minute.
                        </div>
                    </SweetAlert>
                ),
            }));
        } else {
            this.setState(() => ({
                prompt: (
                    <SweetAlert
                        error
                        showCancel
                        title="Oops!"
                        style={{ color: '#666' }}
                        onConfirm={() => this.promptAddPackage(true)}
                        onCancel={this.hidePrompt}
                        confirmBtnText="Try again"
                        cancelBtnText="Get me out of here"
                    >
                        {'You didn\'t enter a package name.'}
                    </SweetAlert>
                ),
            }));
        }
    }

    promptAddPackage(hide = false) {
        const show = () => {
            this.setState(() => ({
                prompt: (
                    <SweetAlert
                        showCancel
                        title="Import New Package"
                        style={{ color: '#666' }}
                        onConfirm={this.confirmImportPackage}
                        onCancel={this.hidePrompt}
                        confirmBtnText="Continue"
                        cancelBtnText="Nope, just kidding"
                        afterMount={() => {
                            document.getElementById('Package Name').focus();
                        }}
                    >
                        <div style={{ width: 442, textAlign: 'left' }}>
                            <PromptInput
                                label="Package Name"
                                placeholder="Package Name"
                                value={this.state.newPackage}
                                onKeyDown={this.onInputKeyDown}
                                onChange={(e) => this.onChangePromptInput('newPackage', e.target.value)}
                            />
                            <PromptInput
                                label="Aliases"
                                placeholder="(optional, comma separated)"
                                value={this.state.alias}
                                onKeyDown={this.onInputKeyDown}
                                onChange={(e) => this.onChangePromptInput('alias', e.target.value)}
                            />
                            <PromptInput
                                label="Version"
                                placeholder="(optional)"
                                value={this.state.version}
                                onKeyDown={this.onInputKeyDown}
                                onChange={(e) => this.onChangePromptInput('version', e.target.value)}
                            />
                        </div>
                    </SweetAlert>
                ),
            }));
        };

        if (hide) {
            this.hidePrompt(show);
        } else {
            show();
        }
    }

    render() {
        return (
            <div>
                <span style={{ display: 'block', fontWeight: 'normal' }}>
                    Packages:&nbsp;
                </span>
                <ul
                    style={{
                        paddingLeft: 0,
                        listStyle: 'none',
                        position: 'relative',
                    }}
                >
                    {Object.keys(this.props.packageVersions).map((name) => (
                        <li
                            key={`package-${name}`}
                            style={{
                                height: 30,
                                position: 'relative',
                            }}
                        >
                            <FontAwesome
                                className="fab"
                                name="js"
                                style={{
                                    color: '#d0d0d0',
                                    fontSize: 23,
                                    position: 'absolute',
                                    top: 1,
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    left: 26,
                                    top: -2,
                                }}
                            >
                                <a
                                    href={`https://www.npmjs.com/package/${name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        textDecoration: 'none',
                                        color: this.props.stringColor,
                                    }}
                                >
                                    {name}
                                </a>
                            </div>
                            <div
                                style={{
                                    fontSize: 9,
                                    color: '#ccc',
                                    position: 'absolute',
                                    top: 14,
                                    left: 26,
                                }}
                            >
                                    v{this.props.packageVersions[name]}
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={this.promptAddPackage}
                    className="btn btn-default"
                    style={buttonStyle}
                >
                    <FontAwesome name="plus-circle" />&nbsp;Import Package
                </button>

                {queryParams.get('packages') && (
                    <button
                        onClick={() => setPackages(null)}
                        className="btn btn-danger"
                        style={buttonStyle}
                    >
                        <FontAwesome name="undo" />&nbsp;Reset Packages
                    </button>
                )}

                {this.state.prompt != null && this.state.prompt}
            </div>
        );
    }
}

Packages.propTypes = {
    packageVersions: PropTypes.shape({}).isRequired,
    packageAliases: PropTypes.shape({}).isRequired,
    stringColor: PropTypes.string.isRequired,
    setLoading: PropTypes.func.isRequired,
};

module.exports = Packages;
