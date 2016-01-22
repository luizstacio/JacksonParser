'use strict';

var JacksonParser = require('../bin');

var chai = require('chai');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;
var assert = require('chai').assert

lab.experiment('JacksonParser', function () {
  lab.test('JacksonParser.decode() uuid false', function (done) {
    var objEncoded = [{
                        id: 1,
                        professional: {
                          id: 1,
                          name: 'Pedro'
                        },
                        professional2: {
                          id: 1,
                          name: 'João',
                          professional: {
                            id: 1,
                            name: 'Pedro'
                          }
                        }
                      }, {
                        id: 2,
                        professional: 1,
                        professional2: 1
                      }];

    var dataEncoded = JacksonParser.decode(objEncoded);
    var data0 = dataEncoded[0];
    var data1 = dataEncoded[1];

    assert.equal(data0.professional.name, 'Pedro');
    assert.equal(data0.professional2.name, 'João');
    assert.equal(data1.professional.name, 'Pedro');
    assert.equal(data1.professional2.name, 'João');

    done();
  });

  lab.test('JacksonParser.decode() uuid true', function (done) {
    var objEncoded = [{
                              id: 1,
                              professional: {
                                id: 'c265832b-2168-4cdf-b24d-bb0680dfa28f',
                                name: 'Pedro'
                              },
                              professional2: {
                                id: 'd365832b-2168-4cdf-b24d-bb0680dfa50d',
                                name: 'João'
                              }
                            }, {
                              id: 2,
                              professional: 'c265832b-2168-4cdf-b24d-bb0680dfa28f',
                              professional2: 'c265832b-2168-4cdf-b24d-bb0680dfa28f'
                            }];

    JacksonParser.config.uuid = true;
    
    var dataEncoded = JacksonParser.decode(objEncoded);
    var data0 = dataEncoded[0];
    var data1 = dataEncoded[1];

    assert.equal(data0.professional.name, 'Pedro');
    assert.equal(data0.professional2.name, 'João');
    assert.equal(data1.professional.name, 'Pedro');
    assert.equal(data1.professional2.name, 'Pedro');

    JacksonParser.config.uuid = false;

    done();
  });

  lab.test('JacksonParser.decode() config.key "@id"', function (done) {
    var objEncoded = [{
                              id: 1,
                              professional: {
                                '@id': 1,
                                name: 'Pedro'
                              },
                              professional2: {
                                '@id': 2,
                                name: 'João'
                              }
                            }, {
                              id: 2,
                              professional: 1,
                              professional2: 2
                            }];

    JacksonParser.config.key = "@id";
    
    var dataEncoded = JacksonParser.decode(objEncoded);
    var data0 = dataEncoded[0];
    var data1 = dataEncoded[1];

    assert.equal(data0.professional.name, 'Pedro');
    assert.equal(data0.professional2.name, 'João');
    assert.equal(data1.professional.name, 'Pedro');
    assert.equal(data1.professional2.name, 'João');

    JacksonParser.config.uuid = false;

    done();
  });

  lab.test('JacksonParser.decode() clone true', function (done) {
    var objEncoded = [{
                              id: 1,
                              professional: {
                                '@id': 1,
                                name: 'Pedro'
                              },
                              professional2: {
                                '@id': 2,
                                name: 'João'
                              }
                            }, {
                              id: 2,
                              professional: 1,
                              professional2: 2
                            }];

    JacksonParser.config.clone = true;
    
    var dataEncoded = JacksonParser.decode(objEncoded);

    assert.equal(objEncoded[1].professional, 1);
    assert.equal(objEncoded[1].professional2, 2);

    JacksonParser.config.clone = false;

    done();
  });
});
