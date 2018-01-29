const R = require('ramda');
const _ = require('lodash');
const compression = require('lzutf8');
const queryParams = require('./queryParams');

module.exports = (id) => {
    const wrapName = (paramName) => `${id}-${paramName}`;

    /**
     * This module is dynamic. Any param added to PARAM_NAMES will
     * automatically have a setter and getter exposed.
     *
     * queryParams.setSnippet(value);
     * queryParams.getSnippet();
     */
    const PARAM_NAMES = {
        SNIPPET: 'snippet',
    };

    const paramNames = R.values(PARAM_NAMES);

    const init = () => {
        const api = {};

        // initialize param values
        paramNames.forEach((paramName) => {
            const wrappedName = wrapName(paramName);
            const ParamName = _.capitalize(_.camelCase(paramName));

            // expose getter
            api[`get${ParamName}`] = () => {
                const value = queryParams.get(wrappedName) || '';
                const isEncoded = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value);
                if (isEncoded) {
                    return compression.decompress(value, { inputEncoding: 'Base64' });
                }

                return value;
            };

            // expose setter
            api[`set${ParamName}`] = (value) => {
                const compressedValue = compression.compress(value, { outputEncoding: 'Base64' });
                queryParams.set(wrappedName, compressedValue);
            };
        });

        return api;
    };

    return init();
};
