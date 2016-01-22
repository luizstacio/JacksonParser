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
  has: has,
  get: get,
  set: set
}