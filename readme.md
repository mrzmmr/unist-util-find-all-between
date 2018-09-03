# unist-util-find-all-between

[![Travis](https://img.shields.io/travis/mrzmmr/unist-util-find-all-between.svg)](https://travis-ci.org/mrzmmr/unist-util-find-all-between)
[![Coverage
Status](https://coveralls.io/repos/github/mrzmmr/unist-util-find-all-between/badge.svg?branch=master)](https://coveralls.io/github/mrzmmr/unist-util-find-all-between?branch=master)


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

console.log(inspect(findAllBetween(parent, start, end, 'text')))
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

## Contribute

PRs accepted and greatly appreciated.

## License

MIT © Paul Zimmer
