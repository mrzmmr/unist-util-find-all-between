'use strict';

/*
 * Dependencies
 */
var is = require('unist-util-is');
var find = require('unist-util-find');

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

  while (++index < length) {
    child = children[index];

    if (is(child, test, index, parent)) {
      results.push(child);
    }
  }

  return results;

  function check(index) {
    if (index && index.type) {
      // `find` will match the parent node but we only want
      // to check child nodes.
      if (parent.type === index.type) {
        parent = {
          type: parent.type + '-root',
          children: parent.children
        }
      }

      var node = find(parent, index);
      index = children.indexOf(node);
    }

    if (isNaN(index) || index < 0 || index === Infinity) {
      throw new Error('Expected positive finite index or child node');
    }

    /* Performance. */
    if (index >= children.length) {
      index = children.length - 1;
    }

    return index;
  }
}

module.exports = findAllBetween;
