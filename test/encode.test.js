'use strict';

var JacksonParser = require('../');

var chai = require('chai');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;
var assert = require('chai').assert;
var mock = require('./mock_encode.json');

lab.experiment('JacksonParser Encode', function () {
  lab.test('JacksonParser.encode() with list', function (done) {
    var objEncoded = mock["JacksonParser.encode()"].in;

    JacksonParser.encode(objEncoded);

    assert.equal(JSON.stringify(objEncoded), mock["JacksonParser.encode()"].out);

    done();
  });

  lab.test('JacksonParser.encode() with list, circular', function (done) {
    var objEncoded =  mock["JacksonParser.encode() with list, circular"].in;
    
    JacksonParser.encode(objEncoded, {
      key: "@id",
      uuid: true
    });

    assert.equal(JSON.stringify(objEncoded), mock["JacksonParser.encode() with list, circular"].out);

    done();
  });

  lab.test('JacksonParser.encode() uuid false', function (done) {
    var objEncoded = mock["JacksonParser.encode() uuid false"].in;
    
    JacksonParser.encode(objEncoded);
    
    assert.equal(JSON.stringify(objEncoded), mock["JacksonParser.encode() uuid false"].out);

    done();
  });

  lab.test('JacksonParser.encode() uuid true', function (done) {
    var objEncoded = mock['JacksonParser.encode() uuid true'].in;
    
    JacksonParser.encode(objEncoded, {
      uuid: true
    });

    assert.equal(JSON.stringify(objEncoded), mock['JacksonParser.encode() uuid true'].out)

    done();
  });

  lab.test("JacksonParser.encode() config.key '@id'", function (done) {
    var objEncoded = mock["JacksonParser.encode() config.key '@id'"].in;
    
    JacksonParser.encode(objEncoded, {
      key: "@id"
    });
    
    assert.equal(JSON.stringify(objEncoded), mock["JacksonParser.encode() config.key '@id'"].out);

    done();
  });

  lab.test('JacksonParser.encode() clone true', function (done) {
    var objEncoded = mock["JacksonParser.encode() clone true"].in;
    var objEncodedClone = JacksonParser.encode(objEncoded, {
      clone: true
    });

    assert.equal(JSON.stringify(objEncoded), mock["JacksonParser.encode() clone true"].out);
    assert.equal(JSON.stringify(objEncodedClone), mock["JacksonParser.encode() clone true"].out_clone);

    done();
  });
});
