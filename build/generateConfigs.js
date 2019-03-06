const path = require('path');
const node = require('rollup-plugin-node-resolve');
const buble = require('rollup-plugin-buble');
const cjs = require('rollup-plugin-commonjs');
const packageDetails = require('../package.json');

const resolve = p => path.resolve(__dirname, '..', p);

/* eslint-disable operator-linebreak */
const banner =
`/*!
  * ${packageDetails.name} v${packageDetails.version}
  * Erdem Bircan - ${new Date().getFullYear()}
  * @licence ${packageDetails.license}
  */`;

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

module.exports = generateConfigs;
