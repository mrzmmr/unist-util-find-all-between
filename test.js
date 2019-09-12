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

  test.doesNotThrow(function () {
    test.throws(function () {
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'bar'
        },
          {
            type: 'baz'
          }]
      }, 0, 1, false)
    }, 'Expected function, string, or object as test')
  }, 'Should fail with invalid test')

  test.doesNotThrow(function () {
    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'bar'
        },
          {
            type: 'baz'
          }]
      }, 0, 1),
      [{type: 'bar'}]
    )

    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'bar'
        },
          {
            type: 'baz'
          }]
      }, 0, 2),
      [{type: 'bar'}, {type: 'baz'}]
    )
  }, 'Should support no test')

  test.doesNotThrow(function () {
    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'bar'
        },
          {
            type: 'baz'
          }]
      }, 0, 1, 'bar'),
      [{type: 'bar'}]
    )

    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'bar'
        },
          {
            type: 'baz'
          }]
      }, 0, 1, 'baz'),
      []
    )
  }, 'Should support `string` test')

  test.doesNotThrow(function () {
    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'bar'
        },
          {
            type: 'baz'
          }]
      }, 0, 1, function (node) {
        return node.type === 'bar'
      }),
      [{type: 'bar'}]
    )

    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'bar'
        },
          {
            type: 'baz'
          }]
      }, 0, 1, function (node) {
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
          type: 'bar'
        },
          {
            type: 'baz'
          }]
      }, 0, 1, {type: 'bar'}),
      [{type: 'bar'}]
    )

    test.deepEqual(
      findAllBetween({
        type: 'foo',
        children: [{
          type: 'bar'
        },
          {
            type: 'baz'
          }]
      }, 0, 1, {type: 'baz'}),
      []
    )
  }, 'Should support `object` test')

  test.end()
})
