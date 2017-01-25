# unist-util-find-all-between

[![CircleCI](https://img.shields.io/circleci/project/github/mrzmmr/unist-util-find-all-between.svg)](https://github.com/mrzmmr/unist-util-find-all-between)
[![Codecov](https://img.shields.io/codecov/c/github/mrzmmr/unist-util-find-all-between.svg)](https://codecov.io/gh/mrzmmr/unist-util-find-all-between)
[![David](https://img.shields.io/david/mrzmmr/unist-util-find-all-between.svg)](https://david-dm.org/)
[![David](https://img.shields.io/david/dev/mrzmmr/unist-util-find-all-between.svg)](https://david-dm.org/)
[![npm](https://img.shields.io/npm/v/unist-util-find-all-between.svg)](https://www.npmjs.com/package/unist-util-find-all-between)



> Utility to find nodes between two nodes

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

```sh
npm install unist-util-find-all-between --save
```

## Usage

```js
var findAllBetween = require('unist-util-find-all-between');
var inspect = require('unist-util-inspect')
var remark = require('remark');

var tree = remark().parse('Some _emphasis_, **importance**, and `code`.');

var parent = tree.children[0]
var start = parent.children[0]
var end = parent.children[parent.children.length - 1]

console.log(inspect(findAllBetween(paren, start, end, 'text')))
```

Yelds:

```bash
text: "Some _emphasis__, " (1:1-1:19, 0-18)
text: ", and " (1:33-1:39, 32-38)
```

## Tests

```sh
npm install
npm test
```

## Dependencies

- [unist-util-is](https://github.com/wooorm/unist-util-is): Utility to check if a node passes a test

## Dev Dependencies

- [codecov](https://github.com/codecov/codecov-node): Uploading report to Codecov: https://codecov.io
- [nyc](https://github.com/istanbuljs/nyc): the Istanbul command line interface
- [remark](https://github.com/wooorm/remark/tree/master/packages): Markdown processor powered by plugins
- [tape](https://github.com/substack/tape): tap-producing test harness for node and browsers

## Contribute

PRs accepted and greatly appreciated.

## License

MIT © mrzmmr

