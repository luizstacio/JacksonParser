function clone(obj) {
    if (obj == null  || "object" != typeof obj) return obj;

    var copy = obj.constructor();
    
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          if (Array.isArray(obj[attr])) {
            copy[attr] = obj[attr].map(clone);
          } else if ("object" == typeof obj[attr]) {
            copy[attr] = clone(obj[attr]);
          } else {
            copy[attr] = obj[attr];
          }
        }
    }
    return copy;
}

function each(data, fn) {
  var keys = Object.keys(data);

  keys.forEach(function (key) {
    fn(data[key], key);
  });
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

module.exports = {
  each: each,
  clone: clone,
  isObject: isObject
}