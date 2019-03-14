import sinon from 'sinon';
import { expect } from 'chai';
import SourceReloadClient from '../../src/SourceReloadClient';
import SourceEventMock from '../mocks/SourceEvent.mock';

let reloadMock;
let windowBackup;

// before test operations
beforeEach(() => {
  global.EventSource = SourceEventMock;

  // faking window
  reloadMock = sinon.fake();
  windowBackup = global.window;
  global.window = {
    location: {
      reload: reloadMock,
    },
  };
});

// after test operations
afterEach(() => {
  // restoring globals
  reloadMock = null;
  global.window = windowBackup;
  delete global.EventSource;
});

describe('SourceReloadClient', () => {
  it('should be a self defining class', () => {
    const tempClient = SourceReloadClient('test/url');
    expect(tempClient).to.be.instanceof(SourceReloadClient);
  });
  it('should be checking for availability of EventSource', () => {
    // removing EventSource from global
    global.EventSource = undefined;
    expect(() => new SourceReloadClient('test/url')).to.throw(Error);
  });
  it('should reload browser depending on the inner logic', () => {
    global.fetch = function fetchMock() { return new Promise((res, rej) => res()); };

    const tempClient = SourceReloadClient('test/url');

    // emulating first connection
    tempClient.client.callEvent('open');

    // emulating disconnect
    tempClient.client.callEvent('error');

    // should change the connection lost checker to false
    // this will also make sure that we correctly binded the callback
    // function to point to client context instead of the SourceEvent context
    expect(tempClient.connectionLost).to.be.equal(true);

    // emulating reconnection
    tempClient.client.callEvent('open');

    // will call window.location.reload
    expect(reloadMock.called).to.be.equal(true);
  });
});