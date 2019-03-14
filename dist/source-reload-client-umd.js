/*!
  * source-reload v1.0.0
  * Erdem Bircan - 2019
  * @licence MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.SourceReloadClient = factory());
}(this, function () { 'use strict';

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

    console.log(("[" + callerName + "]: (" + (logLevels[level].toUpperCase()) + ") " + message));
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

    /*
     * @function reloadLogic - function that contains reload logic for open event
     */
    function reloadLogic() {
      if (this.connectionLost) {
        window.location.reload();
      } else {
        logger('SourceReloadClient', 'connected to host');
      }
    }

    /*
     * @function connectionLostLogic - function that contains reload logic for error event
     */
    function connectionLostLogic() {
      this.connectionLost = true;
      logger('SourceReloadClient', 'connection lost, reconnecting...');
    }

    this.client.addEventListener('open', reloadLogic.bind(this));

    this.client.addEventListener('error', connectionLostLogic.bind(this));
  }

  return SourceReloadClient;

}));
