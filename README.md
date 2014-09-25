[![Build Status](https://secure.travis-ci.org/aleafs/configer.png?branch=master)](http://travis-ci.org/aleafs/configer)
[![Dependency Status](https://gemnasium.com/aleafs/configer.png)](https://gemnasium.com/aleafs/configer)
[![Coverage Status](https://coveralls.io/repos/aleafs/configer/badge.png)](https://coveralls.io/r/aleafs/configer)

## About


## Install

```bash
$ npm install configer
```

## Usage

```javascript

var config = require('configer').create(
  './global.ini',		/**<	inifile	*/
  1000,					/**<	autoreload interval, default 0, means don't autoreload	*/
);

console.log(config.get('key1', 'default'));

```

## License

(The MIT License)

Copyright (c) 2012 aleafs and other contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
