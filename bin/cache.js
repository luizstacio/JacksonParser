function Cache () {
  this.cache = {};
}

Cache.prototype.has = function has (key) {
  return !!this.cache[key];
}

Cache.prototype.set = function set (key, value) {
  this.cache[key] = value;
}

Cache.prototype.get = function get (key) {
  return this.cache[key];
}

module.exports = Cache;