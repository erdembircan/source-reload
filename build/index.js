const rollup = require('rollup');
const { write, generateConfigs } = require('./build');
const { configs } = require('./configs.json');

/**
 * @async
 * @function build - build and write rollup configs
 *
 * @param {array} configs - an array of configuration objects
 * @return {Promise} - a Promise
 */
async function build(configs) {
  for (const { input: inputOptions, output: outputOptions } of configs) {
    const bundle = await rollup.rollup(inputOptions);
    const { output } = await bundle.generate(outputOptions);

    for (const { code, fileName } of output) {
      // TODO write to disk
      try {
        const s = await write(outputOptions.file, code);
        console.log(`${fileName}: ${s}kb`);
      } catch (e) {
        console.log(`${fileName}: ${e.message}`);
        throw err;
      }
    }
  }
}


build(generateConfigs(configs)).then(() => {
  console.log('packages succesfully built');
}).catch((err) => { console.log(`An error occured: ${err.message}`); exit(1); });
