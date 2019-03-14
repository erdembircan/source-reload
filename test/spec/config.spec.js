import { expect } from 'chai';
import generateConfigs from '../../build/generateConfigs';

const { toString } = Object.prototype;

describe('config', () => {
  it('should generate correct configs based on args', () => {
    const fakeConfig = [
      { input: 'fake/path/to/entryfile.js', output: { file: 'entryfile-rolledup-common.js', format: 'cjs' } },
      { input: 'fake/path/to/entryfile.js', output: { file: 'entryfile-rolledup-umd.js', format: 'umd' } },
    ];

    const confs = generateConfigs(fakeConfig);
    expect(toString.call(confs)).to.be.equal('[object Array]');
    expect(confs.length).to.be.equal(fakeConfig.length);
    for (const c of confs) {
      expect(c).to.haveOwnProperty('input');
      expect(c).to.haveOwnProperty('output');
    }
  });
});
