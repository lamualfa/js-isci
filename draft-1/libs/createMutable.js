module.exports = function(opts) {
  const KEYWORD_REGEX = new RegExp('\\[([^\\[\\]]+)\\]');
  const PARAM_REGEX = new RegExp('<([^<>]+)>');
  const KEYWORD_HANDLERS = {
    ...opts.keywordHandlers
  };

  const processKeyword = keywordOpt => {
    return KEYWORD_HANDLERS[keywordOpt.type]
      ? KEYWORD_HANDLERS[keywordOpt.type](keywordOpt)
      : '';
  };

  /**
   * Get next ID from ISCI Schema
   * @returns {string}
   * @param {object} isci ISCI Schema
   * @param {string} isci.name ISCI Name
   * @param {string} isci.pattern ISCI Pattern
   * @param {object} isci.keywords ISCI Keywords
   * @param {object} params Your parameter to be passed
   */
  const next = (isci, params = {}) => {
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
  };

  return { next };
};
