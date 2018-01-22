
const { readFile } = require('fs');

module.exports = (pathToConfig) => {
    if (pathToConfig) {
        let rawConfig = null;
        try {
            rawConfig = readFile(pathToConfig);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(`Failed to load global config from: ${pathToConfig}`);
        }
        if (rawConfig) {
            try {
                return JSON.parse(rawConfig);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.log(`Failed to parse global config from: ${pathToConfig}`);
            }
        }
    }
    return {};
};
