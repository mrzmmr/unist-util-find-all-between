'use strict';

var findAllBetween = require('./')
var remark = require('remark')
var tape = require('tape')

tape('unist-util-find-all-between', function (test) {

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
  }, 'Should fail without test')

  test.end()
})




