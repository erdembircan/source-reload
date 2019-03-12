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

  /*
   * @function reloadLogic - function that contains reload logic for open event
   */
  function reloadLogic() {
    if (this.connectionLost) {
      window.location.reload();
    } else {
      logger(this.name, 'connected to host');
    }
  }

  /*
   * @function connectionLostLogic - function that contains reload logic for error event
   */
  function connectionLostLogic() {
    this.connectionLost = true;
    logger(this.name, 'connection lost, reconnecting...');
  }

  this.client.addEventListener('open', reloadLogic.bind(this));

  this.client.addEventListener('error', connectionLostLogic.bind(this));
}

/** @module SourceReloadClient */
export default SourceReloadClient;
