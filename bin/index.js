var Cache = require('./cache');

var config = {
  key: 'id',
  index: '',
  clone: false,
  uuid: false
};

function cloneObject(obj) {
    if (obj == null  || "object" != typeof obj) return obj;

    var copy = obj.constructor();
    
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          if (Array.isArray(obj[attr])) {
            copy[attr] = obj[attr].map(cloneObject);
          } else if ("object" == typeof obj[attr]) {
            copy[attr] = cloneObject(obj[attr]);
          } else {
            copy[attr] = obj[attr];
          }
        }
    }
    return copy;
}

function mountStorekey(key, item) {
  var index = config.uuid ? '' : key;
  
  
  return (index + ((item[config.key] ? ':' + item[config.key] : '') || ':' + item)).replace(/^:/, '');
}

function storeList(list, key) {
  return list.map(function (item) {
    if ( typeof item == 'object' || Array.isArray(item) ) {
      return parse(storeItem(item, key));
    } else {
      return storeItem(item, key);
    } 
  });
}

function storeItem (item, key) {
  var index;

  if ( item == null ) return item;

  index = mountStorekey(key, item);

  if ( Array.isArray(item) ) return storeList(item, key);
  if ( Cache.has(index) ) return Cache.get(index);
  if ( typeof item === 'object' ) Cache.set(index, item);

  return item;
}

function parse (data) {
  var keys = Object.keys(data);

  keys.forEach(function (key) {
    data[key] = storeItem(data[key], key);
  });

  return data;
}

function parseArray(list) {
  return list.map(function (item) {
    return parse(item);
  });
}

function decode (data) {
  data = config.clone ? cloneObject(data) : data;
  return Array.isArray(data) ? parseArray(data) : parse(data);
}


module.exports = {
  decode: decode,
  config: config
};