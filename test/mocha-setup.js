require('jsdom-global')();

global.expect = require('chai').expect;

process.env.NODE_ENV = 'test';
