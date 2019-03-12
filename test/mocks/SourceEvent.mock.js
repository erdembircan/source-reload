/**
 * @function SourceEventmock - mock agent for EventSourceClient
 *
 * @param {string} url - any url will suffice
 */

// disabling eslint rule since we don't need url in here
/* eslint-disable no-unused-vars */
function SourceEventMock(url) {
  this.events = {};

  this.addEventListener = function addEventListener(type, callback) {
    this.events[type] = callback;
  };

  // mock function to call specific events added with addEventListener
  // for further testing
  this.callEvent = function callEvent(eventType) {
    this.events[eventType]();
  };
}

/** @module SourceEventMock */
export default SourceEventMock;
