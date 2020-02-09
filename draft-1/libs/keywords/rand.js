const randomString = (charset, length) => {
  let result = '';

  while (length--)
    result += charset.charAt(Math.floor(Math.random() * charset.length));

  return result;
};

module.exports = {
  randCharset: keywordOpt =>
    randomString(
      keywordOpt.charset,
      keywordOpt.length
        ? keywordOpt.length
        : Math.floor(
            Math.random() * (keywordOpt.maxLength - keywordOpt.minLength + 1)
          ) + keywordOpt.minLength
    )
};
