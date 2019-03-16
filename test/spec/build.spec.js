import { expect } from 'chai';
import { generateConfigs, getSize, build } from '../../build/build.js';
import { configs } from '../../build/configs.json';

const { toString } = Object.prototype;

describe('build', () => {
  it('generateConfigs should generate correct configs based on args', () => {
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

  it('getSize should return correct size', () => {
    const testContent = Array.from({ length: 1024 }, (_, i) => 0).join('');

    expect(getSize(testContent)).to.be.equal(1);
  });


  it('should successfully build packages', async () => {
     expect(build(generateConfigs(configs))).to.eventually.fulfilled;
  });
});
