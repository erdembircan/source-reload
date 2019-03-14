const express = require('express');
const path = require('path');
const lastJson = require('./last_restart.json');
const { SourceReloadMiddleware } = require('../../dist/source-reload-common');

/**
 * @function Server - an example server using SourceReloadMiddleware
 *
 * @return {object} - express server object
 */
function Server() {
  this._app = express();
  this._app.use(express.static(path.resolve(__dirname, 'public')));
  this._app.use('/dist', express.static(path.resolve(__dirname, '../../dist/')));

  // use the same endpoint for clientside too
  this._app.use('/reloadStream', SourceReloadMiddleware);

  this._app.get('/api/lastrestart', (req, res) => {
    res.send(lastJson);
  });

  this._app.get('/', (req, res) => {
    res.send('index.html');
  });
}

/**
 * @function listen - start serving content
 *
 * @param {number} [port = 8000] - port to listen on
 */
Server.prototype.listen = function listen(port = 8000) {
  this._app.listen(port, () => {
    console.log(`🌍 server started on port ${port}`);
  });
};

/** @module Server */
module.exports = Server;
