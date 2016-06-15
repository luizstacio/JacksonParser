#Jackson Parser

[![Build Status](https://travis-ci.org/luizstacio/JacksonParser.svg?branch=master)](https://travis-ci.org/luizstacio/JacksonParser)

Jackson parser is a parser o// for Jackson object to normalized json.

Jackson is a compressor json.

###Install
```
  npm install jackson-parser
```

###Using
```
  var JacksonParser = require('jackson-parser');

  JacksonParser.decode(<Jackson Object>);// return a normalized json.
  JacksonParser.encode(<JSON>);// return a jackson json.
```
####On global
```
  <script src="./dist/jacksonparser.min.js"></script>
  <script>
    jacksonparser.decode(<Jackson Object>);
  </script>
```

##Configs
```
  var JacksonParser = require('jackson-parser');

  JacksonParser.decode(<Jackson Object>, {
    key: "@id", //default is id
    clone: true, //default is false
    uuid: true, //default is false
  });
```