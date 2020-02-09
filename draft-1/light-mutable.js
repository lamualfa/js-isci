module.exports = require('./libs/createMutable')({
  keywordHandlers: {
    ...require('./libs/keywords/incr'),
    ...require('./libs/keywords/rand')
  }
});
