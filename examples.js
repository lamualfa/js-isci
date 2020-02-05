const { next } = require('./mutable');

const sampleIsci = {
  pattern:
    '<index>-[keyword_1]-[keyword_2]-[keyword_3]-[keyword_4]-[keyword_5]-[keyword_6]',
  keywords: {
    keyword_1: {
      type: 'randCharset',
      length: 5,
      charset: 'abcdefg'
    },
    keyword_2: {
      type: 'incrNumber',
      currentIndex: 0,
      valueIncrease: 1,
      startNumber: 0
    },
    keyword_3: {
      type: 'incrSingleCharset',
      currentIndex: 0,
      valueIncrease: 1,
      length: 6,
      charset: 'hijkl'
    },
    keyword_4: {
      type: 'incrMultiCharsets',
      currentIndex: 0,
      valueIncrease: 1,
      charsets: ['mnopq', 'rstuv', 'wxyz', '01234', '56789']
    },
    keyword_5: {
      type: 'currentDate',
      format: 'yyyy/MM'
    },
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
