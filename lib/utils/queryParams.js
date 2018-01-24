const R = require('ramda');
const _ = require('lodash');

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

    const params = (function paramsClosure() {
        const _params = {};

        return {
            get: (paramName) => _params[paramName],
            set: (paramName, value) => { _params[paramName] = value || null; },
        };
    }());

    const url = (function urlClosure() {
        const getUrl = () => new URL(window.location.href);
        const getSearchParams = () => getUrl().searchParams;

        const appendQuery = (searchParams, paramName) => {
            searchParams.delete(paramName);
            const value = params.get(paramName);
            if (!R.isEmpty(value) && !R.isNil(value)) {
                searchParams.append(paramName, value);
            }
            return searchParams;
        };

        const setQueryString = (queryString) => {
            const location = (R.isEmpty(queryString) || R.isNil(queryString)) ? '/' : `?${queryString}`;
            window.history.replaceState(null, null, location);
        };

        const buildQueryString = () => paramNames.map(wrapName).reduce(appendQuery, getSearchParams()).toString();

        const updateUrl = () => setQueryString(buildQueryString());

        return {
            getSearchParams,
            setQueryString,
            getParamValue: (paramName) => getSearchParams().get(paramName),
            update: updateUrl,
        };
    }());

    const updateParam = (paramName) => (value) => {
        params.set(paramName, value);
        url.update();
    };

    const init = () => {
        const api = {};

        // initialize param values
        paramNames.forEach((paramName) => {
            const wrappedName = wrapName(paramName);

            params.set(wrappedName, url.getParamValue(wrappedName));

            const ParamName = _.capitalize(_.camelCase(paramName));

            // expose getter
            api[`get${ParamName}`] = () => params.get(wrappedName);

            // expose setter
            api[`set${ParamName}`] = updateParam(wrappedName);

            api.removeRawParam = (paramName) => {
                const searchParams = url.getSearchParams();
                searchParams.delete(paramName);
                url.setQueryString(searchParams.toString());
            };

            api.setRawParam = (paramName, value) => {
                const searchParams = url.getSearchParams();
                searchParams.delete(paramName);
                searchParams.append(paramName, value);
                url.setQueryString(searchParams.toString());
            };

            api.getRawParam = url.getParamValue;
        });

        return api;
    };

    return init();
};
