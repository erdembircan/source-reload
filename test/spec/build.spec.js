import fs from 'fs';
import sinon from 'sinon';
import { expect } from 'chai';
import {
  generateConfigs, write, getSize, build,
} from '../../build/build.js';
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

    expect(getSize(testContent)).to.be.equal((1).toFixed(2));
  });


  it('write should return error on invalid path', () => {
    const invalidPath = 123456;
    expect(write(invalidPath, 'test')).to.be.eventually.rejected;
  });

  it('write should eventually resolve', async () => {
    sinon.stub(fs, 'existsSync').returns(false);
    sinon.stub(fs, 'mkdirSync');

    function writeFileMock(t, c, e, callback) {
      callback();
    }
    const writeSandbox = sinon.stub(fs, 'writeFile').callsFake(writeFileMock);


    const testPath = './test/path/a.js';
    const testContent = 'test content';

    expect(write(testPath, testContent)).to.be.eventually.fulfilled;

    fs.existsSync.restore();
    fs.mkdirSync.restore();
    writeSandbox.restore();
  });

  it('write should eventually failed with error callback', async () => {
    sinon.stub(fs, 'existsSync').returns(true);
    sinon.stub(fs, 'mkdirSync');

    function writeFileMock(t, c, e, callback) {
      callback('test error');
    }
    const writeSandbox = sinon.stub(fs, 'writeFile').callsFake(writeFileMock);


    const testPath = './test/path/a.js';
    const testContent = 'test content';

    expect(write(testPath, testContent)).to.be.eventually.rejected;

    fs.existsSync.restore();
    fs.mkdirSync.restore();
    writeSandbox.restore();
  });
});
