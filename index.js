var cacheLink = {},
    config = {
        key: 'id',
        index: ''
    },
    JacksonParser = {
        decode: decode,
        config: config
    },
    toString = Object.prototype.toString;

function normalizeJackson (obj, config) {
    var keys = Object.keys(obj);
    
    keys.forEach(function (key) {
        var val = obj[key],
            _key = config.index + key + ':';

        if ( cacheLink[_key + val] ) {
            obj[key] = cacheLink[_key + val];
        } else if ( toString.apply(val) === '[object Object]' ) {
            cacheLink[_key + val[config.key]] = val;
            normalizeJackson(val, config);
        } else if ( toString.apply(val) === '[object Array]' ) {
            val.forEach(function (item, index) {
                normalizeJackson(item, {
                    key: config.key,
                    index: _key
                });
            });
        }
    });
    
    return obj;
}

function decode (data) {
    if ( Object.prototype.toString.apply(data) === '[object Array]' ) {
        data.forEach(function (item) {
            normalizeJackson(item, JacksonParser.config);
        });

        return data;
    } else {
        return normalizeJackson(data, JacksonParser.config);
    }
}

module.exports = JacksonParser;