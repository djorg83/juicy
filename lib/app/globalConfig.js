
const { readFileSync } = require('fs');

module.exports = (pathToConfig) => {
    console.log('globalConfigPath', pathToConfig);
    if (pathToConfig) {
        let rawConfig = null;
        try {
            rawConfig = readFileSync(pathToConfig);
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
