const generateConfigs = require('./generateConfigs');
const confData = require('./configs.json');

const { input, output } = generateConfigs(confData.configs)[0];

module.exports = { ...input, ...{ output } };
