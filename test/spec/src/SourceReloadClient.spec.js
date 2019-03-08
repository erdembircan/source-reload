import SourceReloadClient from '../../../src/SourceReloadClient';

global.EventSource = function EventSource(url) {
  this.addEventListener = function addEventListener(t, c) {};
};

describe('SourceReloadClient', () => {
  it('should be a self defining class', () => {
    const tempClient = SourceReloadClient('test/url');
    expect(tempClient).to.be.instanceof(SourceReloadClient);
  });
});
