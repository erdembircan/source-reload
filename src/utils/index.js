const logLevels = ['info', 'warning', 'error'];

/**
 * @function logger - log messages to default consoles with loglevels
 *
 * @params {string} callerName - name of the caller
 * @params {string} message - message
 * @params {number} [level=0] - log level, 0 info, 1 warning, 2 error
 */

/* eslint-disable import/prefer-default-export */
export function logger(callerName, message, level = 0) {
  console.log(`[${callerName}]: (${logLevels[level]}.toUpperCase()) ${message}`);
}
