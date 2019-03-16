const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
require('jsdom-global')();

chai.use(chaiAsPromised);
global.expect = chai.expect;
