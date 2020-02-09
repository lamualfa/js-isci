const { next } = require('./mutable');

const sampleIsci = {
  name: 'sampleIsci',
  pattern:
    '<index>-[keyword_1]-[keyword_2]-[keyword_3]-[keyword_4]-[keyword_5]-[keyword_6]',
  keywords: {
    // Using randCharset
    keyword_1: {
      type: 'randCharset',
      length: 5,
      charset: 'abcdefg'
    },

    // Using incrNumber
    keyword_2: {
      type: 'incrNumber',
      index: 0,
      increaser: 1,
      startNumber: 0
    },

    // Using incrCharset
    keyword_3: {
      type: 'incrCharset',
      index: 0,
      increaser: 1,
      length: 6,
      charset: 'hijkl'
    },

    // Using incrCharsets
    keyword_4: {
      type: 'incrCharsets',
      index: 0,
      increaser: 1,
      charsets: ['mnopq', 'rstuv', 'wxyz', '01234', '56789']
    },

    // Using currentDate
    keyword_5: {
      type: 'currentDate',
      format: 'yyyy/MM'
    },

    // Using currentUnixTimestamp
    keyword_6: {
      type: 'currentUnixTimestamp'
    }
  }
};

let i = 0;
while (i++ < 100) {
  console.log(
    next(sampleIsci, {
      index: i
    })
  );
}
