'use strict';

/*
 * Dependencies
 */
var is = require('unist-util-is');

/*
 * Find nodes between `start` and `end` in `parent` which pass `test`.
 */
function findAllBetween(parent, start, end, test) {
  /*
   * Type check parent node
   */
  if (!parent || !parent.type || !parent.children) {
    throw new Error('Expected parent node');
  }

  var children = parent.children;
  var results = [];
  var index = check(start);
  var length = check(end);
  var child;

  while (index < length) {
    child = children[index];

    if (is(test, child, index, parent)) {
      results.push(child);
    }

    index++;
  }

  return results;

  function check(index) {
    if (index && index.type) {
      index = children.indexOf(index);
    }

    if (isNaN(index) || index < 0 || index === Infinity) {
      throw new Error('Expected positive finite index or child node');
    }

    /* Performance. */
    if (index > children.length) {
      index = children.length;
    }

    return index;
  }
}

module.exports = findAllBetween;
