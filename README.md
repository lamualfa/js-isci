[![npm-version](https://flat.badgen.net/npm/v/js-isci?color=red&icon=npm&label=npm)](https://www.npmjs.com/package/js-isci)
[![github-license](https://flat.badgen.net/github/license/laodemalfatih/js-isci?icon=github)](https://github.com/laodemalfatih/js-isci/blob/master/LICENSE)

[![travis-build-status](https://flat.badgen.net/travis/laodemalfatih/js-isci?icon=travis&label=build)](https://travis-ci.org/laodemalfatih/js-isci)
[![codecov-coverage](https://flat.badgen.net/codecov/c/github/laodemalfatih/js-isci?icon=codecov)](https://codecov.io/gh/laodemalfatih/js-isci)
[![david-dependency-status](https://flat.badgen.net/david/dep/laodemalfatih/js-isci)](https://david-dm.org/laodemalfatih/js-isci)

[![jsdelivr-downloads](https://data.jsdelivr.com/v1/package/npm/js-isci/badge)](https://www.jsdelivr.com/package/npm/js-isci)
[![npm-downloads](https://flat.badgen.net/npm/dt/js-isci?color=red&icon=npm)](https://www.npmjs.com/package/js-isci)

# Generate up to 1,5 MILLION++ unique strings (10 character each) in 1 SECOND !!! ![Thunder Icon](assets/thunder.png)![Thunder Icon](assets/thunder.png)![Thunder Icon](assets/thunder.png)

`js-isci` [Draft-1](https://github.com/laodemalfatih/isci/blob/master/drafts/draft-1/README.md) benchmark result:

```bash
1-keyword_isci_1 x 1,524,326 ops/sec ±0.80% (96 runs sampled)
1-keyword_isci_2 x 1,522,268 ops/sec ±0.78% (94 runs sampled)
1-keyword_isci_3 x 1,535,622 ops/sec ±0.68% (94 runs sampled)
```

Run [`node draft-1/benchmark.js`](draft-1/benchmark.js) for concrete proof.

# ISCI Library for Javascript

# What is ISCI?

> ISCI (Identification SCheme Information) is a scheme that stores information related to an identification label. ISCI can standardize an identification label on the system or application you have. ISCI is very flexible. ISCI uses the JSON format, this format allows an identification label to generated on any system at any time. ISCI can be stored in Databases, JSON Files or other storage areas that support the JSON storage format. ISCI can be used across platforms depending on the availability of libraries on each platform.

See [Official ISCI Repository](https://github.com/laodemalfatih/isci)

# ISCI Can Be Used For:

- Class name for _HTML_ element in production mode. Ex: `<button class="r_k92"></button>`
- _API_KEY_ in _API_
- _Opaque Access Token_ in _OAuth_
- _Primary Key_ in _Database_
- _Salt_ character in _Hash_ function
- _User ID_, _Document ID_, _Invoice Number_, _District ID_, etc
- or in lieu of other identification labels that require personal customization

# Where can i storage ISCI ?

You can save it anywhere in a place that supports to save a JSON or JSON string like _MongoDB_, _SQL Server_, _Solr_, _Redis_, _JSON File_, etc.

# Simple ISCI example:

Using ISCI [Draft-1](https://github.com/laodemalfatih/isci/blob/master/drafts/draft-1/README.md).

> Whats is **Draft** in ISCI?
> The **Draft** is a standardized version of the ISCI format

**`accountId.isci.json`** (_You can use any name_) :

```json
{
  "name": "isciAccountId",
  "pattern": "<districtId>_[uniqueCharacter]-[randomCharacter]",
  "keywords": {
    "uniqueCharacter": {
      "type": "incrCharset",
      "charset": "abcdefgh",
      "index": 0,
      "increaser": 1,
      "length": 3
    },
    "randomCharacter": {
      "type": "randCharset",
      "charset": "abcdefghijklmnopq012345",
      "minLength": 5,
      "maxLength": 12
    }
  }
}
```

> in `pattern` section, `districtId` is the parameter that will be input when an _ID_ is created. `uniqueCharacter` and `randomCharacter` are keywords that will be generated automatically by the _ISCI_ library based on the options specified in the `keywords` section. See [Official ISCI Documentation](https://github.com/laodemalfatih/isci/blob/master/README.md) for further information.

You can store this _JSON_ object in _database_ or file to generate an _ID_ anytime, anywhere with any language system depends on the availability of _ISCI_ libraries from each language.

# Instalation

## CDN

### Format:

`https://cdn.jsdelivr.net/npm/js-isci@latest/{draft-version}/dist/{js-version}/{library-mode}.min.js`

- `draft-version`: (_lowercase_) See [List ISCI Drafts](https://github.com/laodemalfatih/isci#list-isci-drafts)
- `js-version` :
  - `js` : **ES2015** version
  - `es` : **ES2016** version
    > **ES2015** support in most browser, while **ES2016** support only in most modern browser
- `library-mode` :

  - `mutable`
  - `immutable`
  - `light-mutable`
  - `light-immutable`
    > What is the difference between _mutable_ and _immutable_ version? See [Mutable Version](#mutable-version)

  > The _light_ version is _50%_ smaller than the non-light version. In _light_ version not include support to `currentDate` and `currentUnixTimestamp` keywords

### Example:

Draft-1, **ES2016**, Mutable : https://cdn.jsdelivr.net/npm/js-isci@latest/draft-1/dist/es/mutable.min.js

Draft-1, **ES2015**, Light Immutable : https://cdn.jsdelivr.net/npm/js-isci@latest/draft-1/dist/js/light-immutable.min.js

## Modules

```bash
# Use npm or yarn
npm install js-isci
```

# Usage

## Browser

```html
<script src="path/to/js-isci" />

<script>
  isci.next(isciObject);
</script>
```

## Node

### Format:

`require('js-isci/{draft-version}/{library-mode}')`

> Property `draft-version` and `library-mode` is the same as the property in the [CDN](#cdn)

> In the node version there is no `js-version` property as in the [CDN](#cdn)

### Example:

```js
// Default import is: Draft-1, Mutable
const { next } = require('js-isci');

// Draft-1, Immutable
const { next } = require('js-isci/draft-1/immutable');

// Draft-1, Light Mutable
const { next } = require('js-isci/draft-1/light-mutable');
```
> Just select one of the examples above

## Example `js-isci` Usage

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
      index: 0,
      increaser: 1,
      startNumber: 0
    },
    keyword_3: {
      type: 'incrCharset',
      index: 0,
      increaser: 1,
      length: 6,
      charset: 'hijkl'
    },
    keyword_4: {
      type: 'incrCharsets',
      index: 0,
      increaser: 1,
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

> You can use the result above as an _ID_ for your data like _`user_id`_, _`document_id`_ and etc.

## Methods

### Mutable version:

#### `.next(isci, params) string`

Params:

- `isci` : `object` - Your ISCI. See [ISCI Formats](https://github.com/laodemalfatih/isci/tree/master/drafts/draft-1#isci-formats) for more information

- `params` : `object` - The ISCI parameter

Get next ID from an ISCI.

### Immutable version:

#### `.next(isci, params) object`

Return:

- `object.result` : `string` - The next ID
- `object.updatedIsci` : `object` - Updated `isci` object.

Same as `.next` method in [mutable](#nextisci-params-string) version, but this function does not change the original `isci` object and returning an `object` contain next _ID_ and updated ISCI.

When is this function is used?

The answer is if you don't want to change the original ISCI object

> In Javascript, all object instances are connected. When you change an instance, other intances will also change.
>
> Example:
>
> ```js
> const original = { key1: 'hello' };
> const instance1 = original;
> const instance2 = original;
>
> // Change value in instance2
> instance2.key1 = 'world';
>
> // Now value of original, instance1, instance2 is:
> // { key1: 'world' }
> ```

## See [`examples.js`](draft-1/examples.js) file for more example or visit [Official ISCI Documentation](https://github.com/laodemalfatih/isci)
