var cache = {};

function has (key) {
  return !!cache[key];
}

function set (key, value) {
  cache[key] = value;
}

function get (key) {
  return cache[key];
}

module.exports = {
  _cache: cache,
  has: has,
  get: get,
  set: set
}