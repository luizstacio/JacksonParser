'use strict';

var JacksonParser = require('../');

var chai = require('chai');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;
var assert = require('chai').assert;
var mock = require('./mock_decode.json');

lab.experiment('JacksonParser Decode', function () {
  lab.test('JacksonParser.decode() with list', function (done) {
    var objEncoded = mock["JacksonParser.decode()"].in;
    
    JacksonParser.decode(objEncoded);

    assert.equal(JSON.stringify(objEncoded), mock["JacksonParser.decode()"].out);

    done();
  });

  lab.test('JacksonParser.decode() with list, circular', function (done) {
    var objEncoded =  mock["JacksonParser.decode() with list, circular"].in;
    
    JacksonParser.decode(objEncoded, {
      key: "@id",
      uuid: true
    });

    assert.equal(JSON.stringify(objEncoded), mock["JacksonParser.decode() with list, circular"].out);

    done();
  });

  lab.test('JacksonParser.decode() uuid false', function (done) {
    var objEncoded = mock["JacksonParser.decode() uuid false"].in;
    
    JacksonParser.decode(objEncoded);
    
    assert.equal(JSON.stringify(objEncoded), mock["JacksonParser.decode() uuid false"].out);

    done();
  });

  lab.test('JacksonParser.decode() uuid true', function (done) {
    var objEncoded = mock['JacksonParser.decode() uuid true'].in;
    
    JacksonParser.decode(objEncoded, {
      uuid: true
    });

    assert.equal(JSON.stringify(objEncoded), mock['JacksonParser.decode() uuid true'].out)

    done();
  });

  lab.test("JacksonParser.decode() config.key '@id'", function (done) {
    var objEncoded = mock["JacksonParser.decode() config.key '@id'"].in;
    
    JacksonParser.decode(objEncoded, {
      key: "@id"
    });
    
    assert.equal(JSON.stringify(objEncoded), mock["JacksonParser.decode() config.key '@id'"].out);

    done();
  });

  lab.test('JacksonParser.decode() clone true', function (done) {
    var objEncoded = mock["JacksonParser.decode() clone true"].in;
    var objEncodedClone = JacksonParser.decode(objEncoded, {
      clone: true
    });

    assert.equal(JSON.stringify(objEncoded), mock["JacksonParser.decode() clone true"].out);
    assert.equal(JSON.stringify(objEncodedClone), mock["JacksonParser.decode() clone true"].out_clone);

    done();
  });
});
