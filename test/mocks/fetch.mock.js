/**
 * @function FetchMock - mock for browser native fetch function
 *
 * @param {boolean} [resError = false] - fetch will return reject as response
 * @param {number} [resStep = 2] - amount of recurse calls to fetch before it resolve
 * @return {function} fetch - mocked fetch function to assign to global
 */
function FetchMock(resError = false, resStep = 2) {
  let currentStep = 0;
  return function fetch() {
    return new Promise((res, rej) => {
      if (resError) {
        currentStep++;
        if (currentStep >= resStep) {
          return res();
        }
        return rej();
      }
      return res();
    });
  };
}

/** @module FetchMock */
export default FetchMock;
