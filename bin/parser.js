var Cache = require('./cache');
var Helpers = require('./helpers');

function Parser (config) {
  this.config = config;
}

Parser.prototype.currentkey = function (attr, value) {
  var key = [attr, value].join(':').replace(/^:/, '');

  return (this.config.uuid) ? value : key;
}

Parser.prototype.replaceObjectDecode = function (obj, attr) {
  var $this = this;

  attr = attr || '$$root';

  if (obj[$this.config.key] != null) {
    $this.cache.set($this.currentkey(attr, obj[$this.config.key]), obj);
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

Parser.prototype.replaceObjectEncode = function (obj, attr) {
  var $this = this;

  attr = attr || '$$root';

  if (obj[$this.config.key] != null) {
    var cacheKey = $this.currentkey(attr, obj[$this.config.key]);

    if ($this.cache.has(cacheKey)) return obj[$this.config.key];
    
    $this.cache.set(cacheKey, obj);
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

Parser.prototype.replaceObject = function (obj, attr) {
  var $this = this;

  return $this.decode ? $this.replaceObjectDecode(obj, attr) : $this.replaceObjectEncode(obj, attr);
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
  if ($this.cache.has($this.currentkey(attr, obj)) && $this.config.key !== attr) {
    return $this.cache.get($this.currentkey(attr, obj));
  }

  return obj;
}

Parser.prototype.parse = function (data) {
  var $this = this;

  data = ($this.config.clone) ? Helpers.clone(data) : data;

  $this.cache = new Cache();
  $this.$root = data;

  return this.replace(data);
}

Parser.prototype.encode = function (data) {
  this.decode = false;
  return this.parse(data); 
}

Parser.prototype.decode = function (data) {
  this.decode = true;
  return this.parse(data); 
}

module.exports = Parser;