const getSearchParams = () => new URL(window.location.href).searchParams;

const setQueryString = (queryString) => {
    const location = !queryString ? '/' : `?${queryString}`;
    window.history.replaceState(null, null, location);
};

const remove = (paramName) => {
    const searchParams = getSearchParams();
    searchParams.delete(paramName);
    setQueryString(searchParams.toString());
};

const set = (paramName, value) => {
    const searchParams = getSearchParams();
    searchParams.delete(paramName);
    if (value) {
        searchParams.append(paramName, value);
    }
    setQueryString(searchParams.toString());
};

const get = (paramName) => getSearchParams().get(paramName);

module.exports = {
    get,
    remove,
    set,
};

