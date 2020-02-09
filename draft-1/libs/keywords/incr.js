const reverse = str => {
  let length = str.length;
  let reversed = '';
  while (length--) reversed += str[length];

  return reversed;
};

module.exports = {
  incrNumber: opts => {
    const result = opts.startNumber + opts.index + opts.increaser;

    opts.index += opts.increaser;

    return result;
  },
  incrCharset: opts => {
    const charsetLength = opts.charset.length;

    let currentIndex = opts.index;
    let length = opts.length;
    let result = '';

    while (length--) {
      const indexCharset = currentIndex % charsetLength;

      result += opts.charset[indexCharset];

      currentIndex = (currentIndex - indexCharset) / charsetLength;
    }

    result = reverse(result);
    opts.index += opts.increaser;

    return result;
  },
  incrCharsets: opts => {
    let result = '';
    let index = opts.index;

    let i = opts.charsets.length;
    while (i--) {
      const subCharset = opts.charsets[i];
      const subCharsetLength = subCharset.length;

      const indexCharset = index % subCharsetLength;

      result += subCharset[indexCharset];

      index = (index - indexCharset) / subCharsetLength;
    }

    result = reverse(result);
    opts.index += opts.increaser;

    return result;
  }
};
