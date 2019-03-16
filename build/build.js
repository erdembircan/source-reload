const path = require('path');
const rollup = require('rollup');
const node = require('rollup-plugin-node-resolve');
const buble = require('rollup-plugin-buble');
const cjs = require('rollup-plugin-commonjs');
const packageDetails = require('../package.json');

const resolve = p => path.resolve(__dirname, '../', p);

/* eslint-disable operator-linebreak */
const banner =
`/*!
  * ${packageDetails.name} v${packageDetails.version}
  * Erdem Bircan - ${new Date().getFullYear()}
  * @licence ${packageDetails.license}
  */`;
/* eslint-enable */

/**
 * @function generateConfigs - generate rollup configs
 *
 * @param {array} configArray - config array
 * @return {array} - an array contains rollup configs
 */
function generateConfigs(configArray) {
  return configArray.map(({ input: inputOption, output: outputOptions }) => ({
    input: {
      input: resolve(inputOption),
      plugins: [
        node(),
        cjs(),
        buble(),
      ],
    },
    output: { ...outputOptions, banner },
  }));
}


/**
 * @function getSize - get size of code in kb
 *
 * @param {string} content - code content
 * @return {number} - size in kb
 */
function getSize(content) {
  return content.length / 1024;
}

/**
 * @function build - build and write packages
 * 
 * @param {array} configs - array of rollup configurations
 * @returns {Promise} - a promise
 */
async function build(configs) {
  for (const { input: inputOptions, output: outputOptions } of configs) {
    const bundle = await rollup.rollup(inputOptions);
    const { output } = await bundle.generate(outputOptions);

    for (const { code, file } of output) {
      // TODO write to disk
    }
  }
}


module.exports = { generateConfigs, getSize, build };
