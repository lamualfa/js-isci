![npm](https://img.shields.io/npm/v/js-isci?color=%23DD3A37&style=for-the-badge)

[![Build Status](https://api.travis-ci.com/laodemalfatih/js-isci.svg?branch=master)](https://travis-ci.org/laodemalfatih/js-isci)
[![codecov](https://codecov.io/gh/laodemalfatih/js-isci/branch/master/graph/badge.svg)](https://codecov.io/gh/laodemalfatih/js-isci)
[![Dependency Status](https://david-dm.org/laodemalfatih/js-isci.svg)](https://david-dm.org/laodemalfatih/js-isci)

[![](https://data.jsdelivr.com/v1/package/npm/js-isci/badge)](https://www.jsdelivr.com/package/npm/js-isci)
[![GitHub license](https://img.shields.io/github/license/laodemalfatih/js-isci?color=informational&style=flat-square)](https://github.com/laodemalfatih/js-isci/blob/master/LICENSE)

# Generate up to 1,5 MILLION++ unique strings with 10 characters in 1 SECOND !!! ![Thunder Icon](assets/thunder.png)![Thunder Icon](assets/thunder.png)![Thunder Icon](assets/thunder.png)

```bash
1-keyword_isci_1 x 1,499,445 ops/sec ±0.91% (92 runs sampled)
1-keyword_isci_2 x 1,518,254 ops/sec ±0.65% (94 runs sampled)
1-keyword_isci_3 x 1,505,860 ops/sec ±0.79% (92 runs sampled)
```

Run [`node benchmark.js`](blob/master/benchmark.js) for concrete proof.

# ISCI Library for Javascript

# What is ISCI?

_Identification Information Schema_ (**ISCI**) is a scheme that contains information from identification labels. **ISCI** can be used instead of _UUID_, _Increment_, _Timestamp_, or _Hash_ in the _ID_ component. **ISCI** can be used across platforms. Depends on the availability of libraries from each language. **ISCI** use _JSON_ as a format in defining schemas. In cases in the field, **ISCI** can be stored in _databases_ such as _MongoDB_, _MYSQL_ or _REDIS_ (as _JSON_ string).

# ISCI Can Be Used For:

- Class name for _HTML_ element in production mode. Ex: `<button class="r_k92-nl"></button>`
- Opaque Token in _OAuth_
- Primary key or Relation ID for document in _database table_ or _collection_
- Salt character in _hash_ function
- User ID, Document ID, Invoice Number, District ID, etc
- in lieu of other identification labels that require personal customization

# Where can i storage ISCI ?

You can save it anywhere in a place that supports to save a JSON or JSON string like _MongoDB_, _SQL Server_, _Solr_, _Redis_, _JSON File_, etc.

# Simple ISCI example:

**`isciAccountId.json`**

```json
{
  "name": "isciAccountId",
  "pattern": "<districtId>_[uniqueCharacter]-[randomCharacter]",
  "keywords": {
    "uniqueCharacter": {
      "type": "incrSingleCharset",
      "charset": "abcdefgh",
      "currentIndex": 0,
      "valueIncrease": 1,
      "length": 3
    },
    "randomCharacter": {
      "type": "randomCharset",
      "charset": "abcdefghijklmnopq012345",
      "minLength": 5,
      "maxLength": 12
    }
  }
}
```

> in `pattern` section, `districtId` is the parameter that will be input when an _ID_ is created. `uniqueCharacter` and `randomCharacter` are keywords that will be generated automatically by the _ISCI_ library based on the options specified in the `keywords` section.

You can store this _JSON_ object in _database_ or file to generate an _ID_ anytime, anywhere with any language system depends on the availability of _ISCI_ libraries from each language.

# Instalation

CDN:

**ES2015** version (_Supported in most browsers_):

- _Mutable_ version: https://cdn.jsdelivr.net/npm/js-isci@latest/dist/mutable.min.js
- _Immutable_ version: https://cdn.jsdelivr.net/npm/js-isci@latest/dist/immutable.min.js

**ES2016** version (_Supported in most modern browsers_):

- _Mutable_ version: https://cdn.jsdelivr.net/npm/js-isci@latest/dist/mutable.es.min.js
- _Immutable_ version: https://cdn.jsdelivr.net/npm/js-isci@latest/dist/immutable.es.min.js

> what is the difference between _Mutable_ and _Immutable_ version? See [Immutable Version](#nextisci-params-object)

Modules:

```bash
# Use npm or yarn
npm install js-isci
```

# Usage

## Browser

```html
<script src="path/to/mutate.min.js" />

<script>
  isci.next(isciObject);
</script>
```

## Node

Choose one:

```js
// Mutable version
const { next } = require('js-isci');
```

```js
// Immutable version
const { next } = require('js-isci/immutable');
```

## Example

<details>
<summary><b>Expand code</b></summary>

```js
const { next } = require('js-isci');

const sampleIsci = {
  pattern:
    '<index>-[keyword_1]-[keyword_2]-[keyword_3]-[keyword_4]-[keyword_5]_[keyword_6]',
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
    }
  }
};

let i = 0;
while (i++ < 6) {
  console.log(
    next(sampleIsci, {
      index: i
    })
  );
}
```

</details>

Output:

```bash
1-efbff-1-hhhhhh_mrw05
2-egdcf-2-hhhhhi_mrw06
3-gcbdd-3-hhhhhj_mrw07
4-aafde-4-hhhhhk_mrw08
5-ebgac-5-hhhhhl_mrw09
6-babbc-6-hhhhih_mrw15
```

#### You can use the result above as an _ID_ for your data like _`user_id`_, _`document_id`_ and etc.

## Formats

### Methods

#### Mutable version:

#### `.next(isci, params) string`

Params:

- `isci.name` : `string` - (_Optional_) Used as a unique code that distinguishes each ISCI. Can be used as a primary key when stored in a database
- `isci.pattern` : `string` - See [Pattern Properties](#pattern-properties)
- `isci.keywords` : `{ keyword }` - See [Keyword Properties](#keyword-properties) for `keyword` information
- `params` : `object` - an Object whose value will be passed as parameter in `isci.pattern`

Get next ID from an ISCI Object.

<details>
<summary><b>Immutable version:</b></summary>

#### `.next(isci, params) object`

Return:

- `object.result` : `string` - The next ID
- `object.updatedIsci` : `object` - Updated `isci` object.

Same as `.next` method in _mutable_ version, but this function does not change the original `isci` object and returning an `object` contain next ID and updated ISCI.

</details>

### Pattern Properties

#### `string`

Use `[ ]` brackets to define keyword and `< >` for parameter.

Example:

```js
// With separator (You can use any character as a separator)
const pattern1 = '<index>_[departementSection]-[randomCharacter]';
// Without separator
const pattern2 = '[id][currentDate]';
```

### Keyword Properties

#### `{ [keywordName] : keywordProperties }`

- `keywordName` : `string` - The name you enter in the `isci.pattern`
- `keywordProperties.types` : `string` - See [Supported Keyword Types](#Supported_Keyword_Types)
- `keywordProperties.<etc>` - Explained bellow. Different, depending on keyword type.

### Supported Keyword Types

<details>
<summary>randCharset</summary>

Generate random strings from available charset.

#### Keyword Properties:

| Properties Name | Type     |
| --------------- | -------- |
| length          | `number` |
| minLength       | `number` |
| maxLength       | `number` |
| charset         | `string` |

> You have to choose one, use `length` or use `minLength` and `maxLength`. The second choice causes the system to generate random length between `minLength` (_inclusive_) and `maxLength` (_inclusive_)

#### Example:

Options:

```js
{
  length: 6,
  charset: '1234abcd', // You can replace this with any character
}
```

Output: (Run 4x)

```bash
bdaa13
114a3b
b441c4
4dca4c
```

</details>

<details>
<summary>incrNumber</summary>

Increment number with specific value.

#### Keyword Properties:

| Properties Name | Type     |
| --------------- | -------- |
| currentIndex    | `number` |
| valueIncrease   | `number` |
| startNumber     | `number` |

#### Example:

Options:

```js
{
  currentIndex: 0,
  valueIncrease: 3,
  startNumber: 1
}
```

Output: (Run 5x)

```bash
4
7
10
13
16
```

</details>

<details>
<summary>incrSingleCharset</summary>

Increment character based on its index position in charset.

#### Keyword Properties:

| Properties Name | Type     |
| --------------- | -------- |
| currentIndex    | `number` |
| valueIncrease   | `number` |
| length          | `number` |
| charset         | `string` |

#### Example:

Options:

```js
{
  currentIndex: 0,
  valueIncrease: 1,
  length: 5,
  charset: 'abcdefg'
}
```

Output: (Run 6x)

```bash
aaaaa
aaaab
aaaac
aaaad
aaaae
aaaaf
```

</details>

<details>
<summary>incrMultiCharsets</summary>

Same as [`incrSingleCharset`](#incrSingleCharset), the difference is it uses many charsets at once and the length of result follow the length of the `charsets`.

#### Keyword Properties:

| Properties Name | Type       |
| --------------- | ---------- |
| currentIndex    | `number`   |
| valueIncrease   | `number`   |
| charsets        | `[string]` |

#### Example:

Options:

```js
{
  currentIndex: 0,
  valueIncrease: 1,
  charsets: ['abc', '123', 'def', 'ghi']
}
```

Output: (Run 4x)

```bash
a1dg
a1dh
a1di
a1eg
```

</details>

<details>
<summary>currentDate</summary>

Only date. nothing is different. it looks like no description is needed.

#### Keyword Properties:

| Properties Name | Type     |
| --------------- | -------- |
| format          | `string` |

> `format` string can be anything, but the following letters will be replaced (and leading zeroes added if necessary) ... See [date-format](https://github.com/nomiddlename/date-format#formatting-dates-as-strings) for more information.

#### Example:

Options:

```js
{
  format: 'yyyy-MM-dd/hh-mm-ss.SSS';
}
```

Output: (Run 1x)

```bash
2020-01-09/15-00-00.000
```

</details>

<details>
<summary>currentUnixTimestamp</summary>

Everything has been explained in [unixtimestamp.com](https://www.unixtimestamp.com/)

#### Keyword Properties:

_No property needed_

#### Example:

Output: (Run 3x)

```bash
1578560571114
1578560571116
1578560571117
```

</details>

#### See [`examples.js`](blob/master/examples.js) file for more example usage.
