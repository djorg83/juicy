

import SweetAlert from 'react-bootstrap-sweetalert';

const React = require('react');
const PropTypes = require('prop-types');
const autobind = require('react-autobind');
const FontAwesome = require('react-fontawesome');
const addPackages = require('../utils/addPackages');

class Packages extends React.Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = {
            prompt: null,
            newPackage: null,
            alias: null,
        };
    }

    onSelectAlias(alias) {
        this.setState(() => ({
            alias,
            prompt: null,
        }), this.confirmImportPackage);
    }

    onSelectPackage(newPackage) {
        this.setState(() => ({
            newPackage,
            prompt: null,
        }), this.promptAlias);
    }

    hidePrompt() {
        this.setState(() => ({ prompt: null, newPackage: null, alias: null }));
    }

    importPackage() {
        let npmPackage = this.state.newPackage;
        if (this.state.alias) {
            npmPackage += `(${this.state.alias})`;
        }
        const packages = Object.keys(this.props.packageAliases).map((packageName) => {
            const alias = this.props.packageAliases[packageName][0];
            return `${packageName}(${alias})`;
        });

        this.props.setLoading(true);
        this.hidePrompt();
        return addPackages([...packages, npmPackage].join(','))
            .then(() => window.location.reload());
    }

    confirmImportPackage() {
        this.setState(() => ({
            prompt: (
                <SweetAlert
                    showCancel
                    title="Import New Package"
                    style={{ outline: 'none', color: '#666' }}
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
                        {this.state.alias && (
                            <span>
                                &nbsp;with an alias of&nbsp;
                                <span style={{ color: '#ff5d38', fontWeight: 'bold' }}>
                                    {this.state.alias}
                                </span>
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
    }

    promptAlias() {
        this.setState(() => ({
            prompt: (
                <SweetAlert
                    type="input"
                    required={false}
                    showCancel
                    title="Import New Package"
                    style={{ outline: 'none', color: '#666' }}
                    onConfirm={this.onSelectAlias}
                    onCancel={this.hidePrompt}
                    confirmBtnText="Continue"
                    cancelBtnText="Nope, just kidding"
                >
                    Enter alias for the package. (optional)
                </SweetAlert>
            ),
        }));
    }

    promptAddPackage() {
        this.setState(() => ({
            prompt: (
                <SweetAlert
                    type="input"
                    showCancel
                    title="Import New Package"
                    style={{ outline: 'none', color: '#666' }}
                    onConfirm={this.onSelectPackage}
                    onCancel={this.hidePrompt}
                    confirmBtnText="Continue"
                    cancelBtnText="Nope, just kidding"
                >
                    Which npm package?
                </SweetAlert>
            ),
        }));
    }

    render() {
        return (
            <div>
                <span style={{ display: 'block', fontWeight: 'normal' }}>
                    Packages:&nbsp;
                </span>
                <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
                    {Object.keys(this.props.packageVersions).map((name) => (
                        <li
                            key={`package-${name}`}
                            style={{ fontSize: 12 }}
                        >
                            <div style={{ color: this.props.stringColor }}>
                                <FontAwesome className="fab" name="js" style={{ color: '#d0d0d0' }} />
                                &nbsp;
                                {name}
                            </div>
                            <div style={{
                                fontSize: 9,
                                color: '#ccc',
                                position: 'relative',
                                top: -5,
                                left: 15,
                            }}
                            >
                                    v{this.props.packageVersions[name]}
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={this.promptAddPackage}
                    className="repl-btns"
                    style={{ borderRadius: 3 }}
                >
                    <FontAwesome name="plus-circle" />&nbsp;Import Package
                </button>

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
