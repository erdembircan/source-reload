import { logger } from './utils';

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
    function ping(pingUrl, timeout = 200) {
      /* eslint-disable no-unused-vars */
      fetch(pingUrl).then(res => window.location.reload()).catch(() => {
        setTimeout(() => ping(pingUrl), timeout);
      });
      /* eslint-enable */
    }
    ping(this.streamUrl);
  }

  this.client.addEventListener('open', reloadLogic.bind(this));

  this.client.addEventListener('error', connectionLostLogic.bind(this));
}

/** @module SourceReloadClient */
export default SourceReloadClient;
