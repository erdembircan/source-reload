const { build, generateConfigs } = require('./build');
const { configs } = require('./configs.json');

build(generateConfigs(configs));
