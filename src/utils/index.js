const logLevels = ['info', 'warning', 'error'];
const callerFormat = 'font-weight: bold';
const callerDefaultFormat = 'font-weight: inherit';
const levelFormat = 'background-color:blue; border-radius:10%; color:white';
const defaultFormat = 'background-color:inherit; border-radius:0; color:inherit';

/**
 * @function logger - log messages to default consoles with loglevels
 *
 * @params {string} callerName - name of the caller
 * @params {string} message - message
 * @params {number} [level=0] - log level, 0 info, 1 warning, 2 error
 */

/* eslint-disable import/prefer-default-export */
export function logger(callerName, message, level = 0) {
  const formatted = `[%c${callerName}%c]: %c(${logLevels[level].toUpperCase()})%c ${message}`;
  console.log(formatted, callerFormat, callerDefaultFormat, levelFormat, defaultFormat);
  return formatted;
}
