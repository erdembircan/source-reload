import { EOL } from 'os';

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
  res.write(`id: 1${EOL}`);
  res.write(`event: reload${EOL}${EOL}`);
  res.write(EOL);
}

/** @module SourceReloadMiddleware */
export default SourceReloadMiddleware;
