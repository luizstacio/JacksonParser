'use strict';

var Helpers = require('../bin/helpers');

var chai = require('chai');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;
var assert = require('chai').assert


lab.experiment('Helpers', function () {
  lab.test('Helpers.clone()', function (done) {
    var obj = { a: { b: [1,2,3] } };
    var clone = Helpers.clone(obj);

    assert.notStrictEqual(obj, clone);
    assert.notStrictEqual(obj.a.b, clone.a.b);

    done();
  });

  lab.test('Helpers.each()', function (done) {
    var obj = { a:1, b:2, c:3 };
    var out = {};
    
    Helpers.each(obj, function (item, key) {
      out[key] = item;
    });

    assert.equal(JSON.stringify(obj), JSON.stringify(out));

    done();
  });

  lab.test('Helpers.isObject()', function (done) {
    
    assert.ok(Helpers.isObject({}));
    assert.notOk(Helpers.isObject([]));
    assert.notOk(Helpers.isObject(null));
    assert.notOk(Helpers.isObject(1));

    done();
  });
});