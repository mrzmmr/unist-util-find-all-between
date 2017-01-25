'use strict';

/*
 * Dependencies
 */
var findAllBefore = require('unist-util-find-all-before');
var findAllAfter = require('unist-util-find-all-after');
var intersection = require('lodash.intersectionby');
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

  /*
   * Type check start and end
   */
  [start, end].forEach(function(input) {
    if (!Number.isSafeInteger(input) || !is(input)) {
      throw new Error('Expected positive finite index or child node');
    }
  });

  var nodesBefore = findAllBefore(parent, start, test);
  var nodesAfter = findAllAfter(parent, start, test);

  return intesection(nodesAfter, nodesBefore, function(nodeA, nodeB) {
    return is(nodeA, nodeB);
  });
}

module.exports = findAllBetween;

