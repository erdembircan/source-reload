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
  this.streamUrl = url;
  this.connectionLost = false;

  this.client = new EventSource(this.streamUrl);

  this.client.addEventListener('open', () => {
    if (this.connectionLost) {
      window.location.reload();
    }
    logger(this.name, 'connected to host');
  });

  this.client.addEventListener('error', () => {
    this.connectionLost = true;
  });
}

/** @module SourceReloadClient */
export default SourceReloadClient;
