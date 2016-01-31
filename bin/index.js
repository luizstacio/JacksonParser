var Cache = require('./cache');
var Helpers = require('./helpers');
var config = {
  key: 'id',
  uuid: false
}

function Parser (data) {}

function currentkey(attr, value) {
  var key = [attr, value].join(':').replace(/^:/, '');

  return (config.uuid) ? value : key;
}

Parser.prototype.replaceObject = function (obj, attr) {
  var $this = this;

  attr = attr || '$$root';

  if (obj[config.key] != null) {
    $this.cache.set(currentkey(attr, obj[config.key]), obj);
  }

  Helpers.each(obj, function (item, key) {
    try {
      obj[key] = $this.replace(item, key);
      if (!Helpers.isObject(item)) JSON.stringify($this.$root);
    } catch(e) {
      obj[key] = item;
    }
  });

  return obj;
}

Parser.prototype.replaceList = function (obj, attr) {
  var $this = this;

  attr = attr || '$$$root';

  obj.forEach(function (item, key) {
    obj[key] = $this.replace(item, attr);
  });

  return obj;
}

Parser.prototype.replace = function (obj, attr) {
  var $this = this;

  if ( obj == null ) return obj;
  if (Array.isArray(obj)) return $this.replaceList(obj, attr);
  if (Helpers.isObject(obj)) return $this.replaceObject(obj, attr);
  if ($this.cache.has(currentkey(attr, obj)) && config.key !== attr) {
    return $this.cache.get(currentkey(attr, obj));
  }

  return obj;
}

Parser.prototype.decode = function decode (data) {
  var $this = this;

  data = (config.clone) ? Helpers.clone(data) : data;

  $this.cache = new Cache();
  $this.$root = data;

  return this.replace(data);
}

function decode(data) {
  var parser = new Parser();
  return parser.decode(data);
}

module.exports = {
  decode: decode,
  config: config
};