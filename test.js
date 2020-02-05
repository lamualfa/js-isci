const { next: mutableNext } = require('./mutable');
const { next: immutableNext } = require('./immutable');

describe('valid result', () => {
  test('valid result randCharset with fixed length', () => {
    let numberOfTest = 10;

    const length = 13;
    const charset = 'abcdefghijk';

    const targetIsci = {
      pattern: '[randCharset]',
      keywords: {
        randCharset: {
          type: 'randCharset',
          length,
          charset
        }
      }
    };

    while (numberOfTest--) {
      expect(mutableNext(targetIsci)).toHaveLength(length);
      expect(mutableNext(targetIsci)).toMatch(
        new RegExp(`^[${charset}]{${length}}$`)
      );
    }
  });

  test('valid result randCharset with random min, max length', () => {
    let numberOfTest = 10;

    const minLength = 7;
    const maxLength = 31;
    const charset = 'abcdefghijklmn';

    const targetIsci = {
      pattern: '[randCharset]',
      keywords: {
        randCharset: {
          type: 'randCharset',
          minLength,
          maxLength,
          charset
        }
      }
    };

    while (numberOfTest--) {
      const resultLength = mutableNext(targetIsci).length;
      expect(resultLength).toBeLessThanOrEqual(maxLength);
      expect(resultLength).toBeGreaterThanOrEqual(minLength);

      expect(mutableNext(targetIsci)).toMatch(
        new RegExp(`^[${charset}]{${minLength},${maxLength}}$`)
      );
    }
  });

  test('valid result incrNumber', () => {
    let numberOfTest = 10;

    const startNumber = 0;
    const currentIndex = 0;
    const valueIncrease = 1;

    const targetIsci = {
      pattern: '[incrNumber]',
      keywords: {
        incrNumber: {
          type: 'incrNumber',
          startNumber,
          currentIndex,
          valueIncrease
        }
      }
    };

    while (numberOfTest--) {
      expect(mutableNext(targetIsci)).toMatch(/^\d+$/);
      expect(parseInt(mutableNext(targetIsci))).toBeGreaterThan(startNumber);
    }
  });

  test('valid result incrSingleCharset', () => {
    let numberOfTest = 10;

    const currentIndex = 0;
    const valueIncrease = 1;
    const charset = 'abcdefghijklmnopqrs';
    const length = 30;

    const targetIsci = {
      pattern: '[incrSingleCharset]',
      keywords: {
        incrSingleCharset: {
          type: 'incrSingleCharset',
          currentIndex,
          valueIncrease,
          charset,
          length
        }
      }
    };

    while (numberOfTest--) {
      expect(mutableNext(targetIsci)).toHaveLength(length);
      expect(mutableNext(targetIsci)).toMatch(
        new RegExp(`^[${charset}]{${length}}$`)
      );
    }
  });

  test('valid result incrMultiCharsets', () => {
    let numberOfTest = 10;

    const currentIndex = 0;
    const valueIncrease = 1;
    const charsets = ['abcdefghijklmnopqrs', '0123456789', 'tuvwxyz'];
    const length = charsets.length;

    const targetIsci = {
      pattern: '[incrMultiCharsets]',
      keywords: {
        incrMultiCharsets: {
          type: 'incrMultiCharsets',
          currentIndex,
          valueIncrease,
          charsets
        }
      }
    };

    const joinedCharsets = charsets.join('');

    while (numberOfTest--) {
      expect(mutableNext(targetIsci)).toHaveLength(length);
      expect(mutableNext(targetIsci)).toMatch(
        new RegExp(`^[${joinedCharsets}]{${length}}$`)
      );
    }
  });

  test('valid result currentDate', () => {
    let numberOfTest = 10;

    const format = 'yyyy-MM-dd-hh-ss-SSS';

    const targetIsci = {
      pattern: '[currentDate]',
      keywords: {
        currentDate: {
          type: 'currentDate',
          format
        }
      }
    };

    while (numberOfTest--) {
      expect(mutableNext(targetIsci)).toHaveLength(format.length);
    }
  });

  test('valid result currentUnixTimestamp', () => {
    let numberOfTest = 10;

    const targetIsci = {
      pattern: '[currentUnixTimestamp]',
      keywords: {
        currentUnixTimestamp: {
          type: 'currentUnixTimestamp'
        }
      }
    };

    while (numberOfTest--) {
      expect(parseInt(mutableNext(targetIsci))).toBeTruthy();
    }
  });

  test('valid result with parameter', () => {
    let numberOfTest = 10;

    const targetIsci = {
      pattern: '<index>-[currentUnixTimestamp]',
      keywords: {
        currentUnixTimestamp: {
          type: 'currentUnixTimestamp'
        }
      }
    };

    while (numberOfTest--) {
      expect(
        mutableNext(targetIsci, {
          index: numberOfTest
        })
      ).toMatch(new RegExp(`^${numberOfTest}-`));
    }
  });

  test('valid result immutable', () => {
    let numberOfTest = 10;

    const startNumber = 0;
    const currentIndex = 0;
    const valueIncrease = 1;

    const targetIsci = {
      pattern: '[incrNumber]',
      keywords: {
        incrNumber: {
          type: 'incrNumber',
          startNumber,
          currentIndex,
          valueIncrease
        }
      }
    };
    const backupIsci = JSON.parse(JSON.stringify(targetIsci));

    while (numberOfTest--) {
      immutableNext(targetIsci);
      expect(targetIsci).toStrictEqual(backupIsci);
    }
  });
});
