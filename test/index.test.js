'use strict';

var JacksonParser = require('../');

var chai = require('chai');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;
var assert = require('chai').assert;
var mock = require('./mock.json');

function clearConfig() {
  JacksonParser.config.key = 'id';
  JacksonParser.config.uuid = false;
}

lab.experiment('JacksonParser', function () {
  lab.test('JacksonParser.decode() with list', function (done) {
    var objEncoded = mock["JacksonParser.decode()"].in;
    
    JacksonParser.decode(objEncoded);

    assert.equal(JSON.stringify(objEncoded), mock["JacksonParser.decode()"].out);

    clearConfig();
    done();
  });

  lab.test('JacksonParser.decode() with list, circular', function (done) {
      JacksonParser.config.key = "@id";
      JacksonParser.config.uuid = true;

      var objEncoded =  mock["JacksonParser.decode() with list, circular"].in;
      
      JacksonParser.decode(objEncoded);

      assert.equal(JSON.stringify(objEncoded), mock["JacksonParser.decode() with list, circular"].out);

      clearConfig();
      done();
    });

  lab.test('JacksonParser.decode() uuid false', function (done) {
    var objEncoded = mock["JacksonParser.decode() uuid false"].in;
    
    JacksonParser.decode(objEncoded);
    
    assert.equal(JSON.stringify(objEncoded), mock["JacksonParser.decode() uuid false"].out);

    clearConfig();
    done();
  });

  lab.test('JacksonParser.decode() uuid true', function (done) {
    JacksonParser.config.uuid = true;

    var objEncoded = mock['JacksonParser.decode() uuid true'].in;
    
    JacksonParser.decode(objEncoded);

    assert.equal(JSON.stringify(objEncoded), mock['JacksonParser.decode() uuid true'].out)

    clearConfig();
    done();
  });

  lab.test("JacksonParser.decode() config.key '@id'", function (done) {
    JacksonParser.config.key = "@id";
    
    var objEncoded = mock["JacksonParser.decode() config.key '@id'"].in;
    
    JacksonParser.decode(objEncoded);
    
    assert.equal(JSON.stringify(objEncoded), mock["JacksonParser.decode() config.key '@id'"].out);

    clearConfig();
    done();
  });

  lab.test('JacksonParser.decode() clone true', function (done) {
    JacksonParser.config.clone = true;

    var objEncoded = mock["JacksonParser.decode() clone true"].in;
    var objEncodedClone = JacksonParser.decode(objEncoded);

    assert.equal(JSON.stringify(objEncoded), mock["JacksonParser.decode() clone true"].out);
    assert.equal(JSON.stringify(objEncodedClone), mock["JacksonParser.decode() clone true"].out_clone);

    clearConfig();
    done();
  });
});
