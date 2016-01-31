'use strict';

var Cache = require('../bin/cache');

var chai = require('chai');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;
var assert = require('chai').assert


lab.experiment('Cache', function () {
  lab.test('new Cache()', function (done) {
    var cache = new Cache();

    expect(cache).to.be.an.instanceof(Cache);

    done();
  });

  lab.test('cache.set()', function (done) {
    var cache = new Cache();

    cache.set('A', 1);

    assert.equal(cache.get('A'), 1);

    done();
  });

  lab.test('intances cache.get()', function (done) {
    var cache = new Cache();

    assert.equal(cache.get('A'), undefined);

    done();
  });
});