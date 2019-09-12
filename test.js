'use strict';

var findAllBetween = require('./')
var test = require('tap').test

test('unist-util-find-all-between', function (test) {

  test.throws(function () {
    findAllBetween()
  }, 'Should fail without parent node')

  test.throws(function () {
    findAllBetween({type: 'foo'})
  }, 'Should fail without parent node')

  test.doesNotThrow(function () {

    test.throws(function () {
      findAllBetween({type: 'foo', children: []})
    }, 'Expected positive finite index or child node')

    test.throws(function () {
      findAllBetween({type: 'foo', children: []}, -1)
    }, 'Expected positive finite index or child node')

    test.throws(function () {
      findAllBetween({type: 'foo', children: []}, {type: 'bar'})
    }, 'Expected positive finite index or child node')

    test.throws(function () {
      findAllBetween({type: 'foo', children: []}, 1, {type: 'bar'})
    }, 'Expected positive finite index or child node')
  }, 'Should fail without index')

  test.doesNotThrow(() => {
    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'foo'
        }, {
          type: 'bar'
        }]
      }, 0, 1, false),
      []
    )
  }, 'Should not throw with `unist-util-is` >= 4.0.0')

  test.doesNotThrow(function () {
    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'foo',
        }, {
          type: 'bar'
        }, {
          type: 'baz'
        }]
      }, 0, 2),
      [{type: 'bar'}]
    )

    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'bar'
        }, {
          type: 'baz'
        }]
      }, 0, 2),
      []
    )
  }, 'Should support no test')

  test.doesNotThrow(function () {
    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'foo'
        }, {
          type: 'bar'
        }, {
          type: 'baz'
        }]
      }, 0, 2, 'bar'),
      [{type: 'bar'}]
    )

    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'foo'
        }, {
          type: 'bar'
        }, {
          type: 'baz'
        }]
      }, 0, 2, 'baz'),
      []
    )
  }, 'Should support `string` test')

  test.doesNotThrow(function () {
    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'foo'
        }, {
          type: 'bar'
        }, {
          type: 'baz'
        }]
      }, 0, 2, function (node) {
        return node.type === 'bar'
      }),
      [{type: 'bar'}]
    )

    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'foo'
        }, {
          type: 'bar'
        }, {
          type: 'baz'
        }]
      }, 0, 2, function (node) {
        return node.type === 'baz'
      }),
      []
    )
  }, 'Should support `function` test')

  test.doesNotThrow(function () {
    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'foo'
        }, {
          type: 'bar'
        }, {
          type: 'baz'
        }]
      }, 0, 2, {type: 'bar'}),
      [{type: 'bar'}]
    )

    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'foo'
        }, {
          type: 'bar'
        }, {
          type: 'baz'
        }]
      }, 0, 2, {type: 'baz'}),
      []
    )
  }, 'Should support `object` test')

  test.doesNotThrow(function () {
    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'foo'
        }, {
          type: 'bar'
        }, {
          type: 'baz'
        }]
      }, {type: 'foo'}, 2, 'bar'),
      [{type: 'bar'}]
    )

    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'foo'
        }, {
          type: 'bar'
        }, {
          type: 'baz'
        }]
      }, 0, {type: 'baz'}, 'bar'),
      [{type: 'bar'}]
    )

    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'foo'
        }, {
          type: 'bar'
        }, {
          type: 'baz'
        }]
      }, {type: 'foo'}, 2, {type: 'bar', value: 'baz'}),
      []
    )
  }, 'Should support `node` as `start` and/or `end`.')

  test.end()
})
