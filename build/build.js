const path = require('path');
const fs = require('fs');
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
  return (content.length / 1024).toFixed(2);
}

/**
 * @function write - write content to disk
 *
 * @param {string} target - target path
 * @param {string} content - content to be written
 * @return {Promise} - promise object
 */
function write(target, content) {
  return new Promise((res, rej) => {
    let parsedPath;
    try {
      parsedPath = path.parse(target);
    } catch (e) {
      return rej(e);
    }

    if (!fs.existsSync(parsedPath.dir)) {
      fs.mkdirSync(parsedPath.dir, { recursive: true });
    }

    fs.writeFile(target, content, 'utf8', (err) => {
      if (err) {
        return rej(Error(`An error occured: ${err}`));
      }
      return res(getSize(content));
    });
  });
}

/** @module build */
module.exports = {
  generateConfigs, getSize, write,
};
