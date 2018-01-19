

module.exports = (replTitle) => {
    const themeKey = `${replTitle}-theme`;
    const autoRunKey = `${replTitle}-autorun`;

    const getTheme = () => localStorage.getItem(themeKey);
    const setTheme = (theme) => localStorage.setItem(themeKey, theme);

    const getAutoRun = () => localStorage.getItem(autoRunKey);
    const setAutoRun = (autoRun) => localStorage.setItem(autoRunKey, autoRun);

    const getPins = () => JSON.parse(localStorage.getItem('pins') || '[]');
    const savePin = (name, queryString) => {
        const pins = getPins();
        const pin = { name, queryString };

        const existingIndex = pins.findIndex((p) => p.name === name);
        if (existingIndex > -1) {
            pins[existingIndex] = pin;
        } else {
            pins.push(pin);
        }

        localStorage.setItem('pins', JSON.stringify(pins));
    };

    const removePin = (name) => {
        localStorage.setItem('pins', JSON.stringify(getPins().filter((p) => p.name !== name)));
    };

    return {
        getTheme,
        setTheme,
        getAutoRun,
        setAutoRun,
        getPins,
        savePin,
        removePin,
    };
};
