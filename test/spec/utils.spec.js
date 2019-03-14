import sinon from 'sinon';
import { logger } from '../../src/utils';

describe('utils', () => {
  it('logger should log in correct format', () => {
    const callerName = 'test-caller';
    const message = 'test message';
    const expectedFormat = `[${callerName}]: (INFO) ${message}`;

    const formatted = logger(callerName, message);
    expect(formatted).to.be.equal(expectedFormat);
  });
});
