/**
 * @license js-isci v1.0.2
 * Javascript ISCI Library
 * Copyright © 2020 Laode Muhammad Al Fatih
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { asString: dateFormatAsString } = require('date-format');

const KEYWORD_REGEX = new RegExp('\\[([^\\[\\]]+)\\]');
const PARAM_REGEX = new RegExp('<([^<>]+)>');
const KEYWORD_HANDLERS = {
  incrNumber: keywordOpt => {
    const result =
      keywordOpt.startNumber +
      keywordOpt.currentIndex +
      keywordOpt.valueIncrease;

    keywordOpt.currentIndex += keywordOpt.valueIncrease;

    return result;
  },
  incrSingleCharset: keywordOpt => {
    const charsetLength = keywordOpt.charset.length;

    let currentIndex = keywordOpt.currentIndex;
    let length = keywordOpt.length;
    let result = '';

    while (length--) {
      const indexCharset = currentIndex % charsetLength;

      result += keywordOpt.charset[indexCharset];

      currentIndex = (currentIndex - indexCharset) / charsetLength;
    }

    result = reverse(result);
    keywordOpt.currentIndex += keywordOpt.valueIncrease;

    return result;
  },
  incrMultiCharsets: keywordOpt => {
    let result = '';
    let index = keywordOpt.currentIndex;

    let i = keywordOpt.charsets.length;
    while (i--) {
      const subCharset = keywordOpt.charsets[i];
      const subCharsetLength = subCharset.length;

      const indexCharset = index % subCharsetLength;

      result += subCharset[indexCharset];

      index = (index - indexCharset) / subCharsetLength;
    }

    result = reverse(result);
    keywordOpt.currentIndex += keywordOpt.valueIncrease;

    return result;
  },
  randCharset: keywordOpt =>
    randomString(
      keywordOpt.charset,
      keywordOpt.length
        ? keywordOpt.length
        : Math.floor(
            Math.random() * (keywordOpt.maxLength - keywordOpt.minLength + 1)
          ) + keywordOpt.minLength
    ),
  currentDate: keywordOpt => dateFormatAsString(keywordOpt.format, new Date()),
  currentUnixTimestamp: () => Date.now()
};

const randomString = (charset, length) => {
  let result = '';

  while (length--)
    result += charset.charAt(Math.floor(Math.random() * charset.length));

  return result;
};

const reverse = string => {
  let stringLength = string.length;
  let reversed = '';
  while (stringLength--) reversed += string[stringLength];

  return reversed;
};

const processKeyword = keywordOpt =>
  KEYWORD_HANDLERS[keywordOpt.type]
    ? KEYWORD_HANDLERS[keywordOpt.type](keywordOpt)
    : '';

/**
 * Get next ID from ISCI Schema
 * @returns {string}
 * @param {object} isci ISCI Schema
 * @param {string} isci.name ISCI Name
 * @param {string} isci.pattern ISCI Pattern
 * @param {object} isci.keywords ISCI Keywords
 * @param {object} params Your parameter to be passed
 */
function next(isci, params = {}) {
  let result = isci.pattern;
  let matchedParam;
  let matchedKeyword;

  while ((matchedParam = PARAM_REGEX.exec(result)) !== null)
    result =
      result.substring(0, matchedParam.index) +
      (Object.prototype.hasOwnProperty.call(params, matchedParam[1])
        ? params[matchedParam[1]]
        : '') +
      result.substring(matchedParam.index + matchedParam[0].length);

  while ((matchedKeyword = KEYWORD_REGEX.exec(result)) !== null)
    result =
      result.substring(0, matchedKeyword.index) +
      (isci.keywords[matchedKeyword[1]]
        ? processKeyword(isci.keywords[matchedKeyword[1]])
        : '') +
      result.substring(matchedKeyword.index + matchedKeyword[0].length);

  return result;
}

module.exports.next = next;
