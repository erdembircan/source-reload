import sinon from 'sinon';
import { logger } from '../../src/utils';

describe('utils', () => {
  it('logger should log in correct format', () => {
    const logMock = sinon.fake();
    const realLog = console.log;
    console.log = logMock;

    sinon.replace(console, 'log', logMock);

    const callerName = 'test-caller';
    const message = 'test message';

    const expectedFormat = `[${callerName}]: (INFO) ${message}`;

    logger(callerName, message);
    console.log = realLog;
    expect(logMock.calledWith(expectedFormat)).to.be.equal(true);
  });
});
