/*!
  * source-reload v1.0.0
  * Erdem Bircan - 2019
  * @licence MIT
  */
'use strict';

var os = require('os');

var logLevels = ['info', 'warning', 'error'];

/**
 * @function logger - log messages to default consoles with loglevels
 *
 * @params {string} callerName - name of the caller
 * @params {string} message - message
 * @params {number} [level=0] - log level, 0 info, 1 warning, 2 error
 */

/* eslint-disable import/prefer-default-export */
function logger(callerName, message, level) {
  if ( level === void 0 ) level = 0;

  console.log(("[" + callerName + "]: (" + (logLevels[level]) + ".toUpperCase()) " + message));
}

/**
 * @function SourceReload - client for the front end
 *
 * @param {string} url - backend url for connecting to EventStream
 */
function SourceReloadClient(url) {
  var this$1 = this;

  if (!(this instanceof SourceReloadClient)) {
    return new SourceReloadClient(url);
  }

  if (!EventSource) {
    throw new Error('EventSource is not defined, either use a pollyfill or try at another browser');
  }

  this.streamUrl = url;
  this.connectionLost = false;

  this.client = new EventSource(this.streamUrl);

  this.client.addEventListener('open', function () {
    if (this$1.connectionLost) {
      window.location.reload();
    }
    logger(this$1.name, 'connected to host');
  });

  this.client.addEventListener('error', function () {
    this$1.connectionLost = true;
  });
}

/**
 * @function SourceReloadMiddleware - event-stream middleware for Express.js
 *
 * @param {object} req - request object
 * @param {object} res - response object
 */
function SourceReloadMiddleware(req, res) {
  req.socket.setTimeout(100 * 60 * 60 * 24);

  res.writeHead(200, {
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
  });

  res.write();
  res.write(("id: 1" + os.EOL));
  res.write(("event: reload" + os.EOL + os.EOL));
  res.write(os.EOL);
}

/** @module SourceReload */
var index = { SourceReloadClient: SourceReloadClient, SourceReloadMiddleware: SourceReloadMiddleware };

module.exports = index;
