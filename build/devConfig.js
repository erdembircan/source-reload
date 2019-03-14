const generateConfigs = require('./generateConfigs');
const confData = require('./configs.json');

// const { input, output } = generateConfigs(confData.configs)[0];
let { input, output } = generateConfigs(confData.configs)[0];
const dev1 = { ...input, ...{ output } };

const config2 = generateConfigs(confData.configs)[1];
input = config2.input;
output = config2.output;
const dev2 = { ...input, ...{ output } };

module.exports = [dev1, dev2];
