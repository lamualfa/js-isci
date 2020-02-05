const { next } = require('./mutable');
const rfdc = require('rfdc');

const deepClone = rfdc({
  proto: true
});

/**
 * Get next ID from ISCI Schema without manipulate original ISCI Schema
 * @returns {object}
 * @param {object} isci ISCI Schema
 * @param {string} isci.pattern ISCI Pattern
 * @param {object} isci.keywords ISCI Keywords
 * @param {object} params Your parameter to be passed
 */
function immutableNext(isci, params) {
  const clonedIsci = deepClone(isci);

  return {
    result: next(clonedIsci, params),
    updatedIsci: clonedIsci
  };
}

module.exports.next = immutableNext;
