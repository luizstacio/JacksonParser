var Parser = require('./parser');
var Helpers = require('./helpers');
var config = {
  key: 'id',
  uuid: false,
  clone: false
}

function getConfig(_config) {
  _config = _config || {};
  return Helpers.extend(Helpers.clone(config), _config);
}

function decode(data, config) {
  var parser = new Parser(getConfig(config));
  return parser.decode(data);
}

function encode(data, config) {
  var parser = new Parser(getConfig(config));
  return parser.encode(data);
}

module.exports = {
  encode: encode,
  decode: decode,
  config: config
};