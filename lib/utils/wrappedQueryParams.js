const R = require('ramda');
const _ = require('lodash');
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
            api[`get${ParamName}`] = () => queryParams.get(wrappedName);

            // expose setter
            api[`set${ParamName}`] = (value) => queryParams.set(wrappedName, value);
        });

        return api;
    };

    return init();
};
