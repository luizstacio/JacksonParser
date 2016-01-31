#Jackson Parser

[![Build Status](https://travis-ci.org/luizstacio/JacksonParser.svg?branch=master)](https://travis-ci.org/luizstacio/JacksonParser)

Jackson parser is a parser o// for Jackson object to normalized json.

###Install
```
  npm install jackson-parser
```

###Using
```
  var JacksonParser = require('jackson-parser');

  JacksonParser.decode(<Jackson Object>);// return a normalized json.
```

##Config
```
  var JacksonParser = require('jackson-parser');

  JacksonParser.config.key = "@id";

  JacksonParser.decode(<Jackson Object>);// return a normalized json.
```