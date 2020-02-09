const { asString: dateFormatAsString } = require('date-format');

module.exports = {
  currentDate: keywordOpt => dateFormatAsString(keywordOpt.format, new Date()),
  currentUnixTimestamp: () => Date.now()
};
