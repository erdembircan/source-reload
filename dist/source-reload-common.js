/*!
  * source-reload v1.0.1
  * Erdem Bircan - 2019
  * @licence MIT
  */
'use strict';

var logLevels = ['info', 'warning', 'error'];
var callerFormat = 'font-weight: bold';
var callerDefaultFormat = 'font-weight: inherit';
var levelFormat = 'background-color:blue; border-radius:10%; color:white';
var defaultFormat = 'background-color:inherit; border-radius:0; color:inherit';

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

  var formatted = "[%c" + callerName + "%c]: %c(" + (logLevels[level].toUpperCase()) + ")%c " + message;
  console.log(formatted, callerFormat, callerDefaultFormat, levelFormat, defaultFormat);
  return formatted;
}

/**
 * @function SourceReload - client for the front end
 *
 * @param {string} url - backend url for connecting to EventStream
 */
function SourceReloadClient(url) {
  if (!(this instanceof SourceReloadClient)) {
    return new SourceReloadClient(url);
  }

  if (!EventSource) {
    throw new Error('EventSource is not defined, either use a pollyfill or try at another browser');
  }

  this.streamUrl = url;
  this.connectionLost = false;

  this.client = new EventSource(this.streamUrl);

  // browsers have different reconnect intervals for event-stream
  // so we will be using some kind of a race condition here
  // either browser will auto connect with reloadLogic
  // or our connectionLostLogic with ping approach

  /**
   * @function reloadLogic - function that contains reload logic for open event
   */
  function reloadLogic() {
    if (this.connectionLost) {
      window.location.reload();
    } else {
      logger('SourceReloadClient', 'connected to host');
    }
  }

  /**
   * @function connectionLostLogic - function that contains reload logic for error event
   */
  function connectionLostLogic() {
    this.connectionLost = true;
    logger('SourceReloadClient', 'connection lost, reconnecting...', 2);

    /**
     * @function ping - recursive function for pinging
     *
     * @param {string} pingUrl - url to ping
     * @param {number} [timeout = 200] - ms to wait for next try
     */
    function ping(pingUrl, timeout) {
      if ( timeout === void 0 ) timeout = 200;

      /* eslint-disable no-unused-vars */
      fetch(pingUrl).then(function (res) { return window.location.reload(); }).catch(function () {
        setTimeout(function () { return ping(pingUrl); }, timeout);
      });
      /* eslint-enable */
    }
    ping(this.streamUrl);
  }

  this.client.addEventListener('open', reloadLogic.bind(this));

  this.client.addEventListener('error', connectionLostLogic.bind(this));
}

var EOL = '\n';
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

  res.write(EOL);
  res.write(("id: 1" + EOL));
  res.write(("event: reload" + EOL + EOL));
  res.write(EOL);
}

/** @module SourceReload */
var index = { SourceReloadClient: SourceReloadClient, SourceReloadMiddleware: SourceReloadMiddleware };

module.exports = index;
