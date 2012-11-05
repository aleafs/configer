/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

var fs = require('fs');
var trim = require('quicktrim').trim;
var clone = require('clone');

var normalize = function (s) {
  return trim(s).toLowerCase();
};

var __configParsers = {};

/* {{{ load parsers */
fs.readdirSync(__dirname + '/parser/').forEach(function (fname) {
  if (!fname.match(/\.js$/)) {
    return;
  }
  __configParsers[normalize(fname.split('.').shift())] = require(__dirname + '/parser/' + fname).parse;
});
/* }}} */

exports.create  = function(file) {

  var origins = {};

  var extension = normalize(file.split('.').pop());
  if (!__configParsers[extension]) {
    throw new Error('UndefinedConfigParser');
  }

  try {
    origins = __configParsers[extension](fs.readFileSync(file));
  } catch (e) {
    // XXX: error for config file should be throw out
    throw e;
  }

  var _me = {};
  _me.get = function(key, _default) {
    return clone(origins[key]) || _default;
  };

  _me.all = function() {
    return clone(origins);
  };

  _me.find = function(prefix) {
    var map = {};
    if (!prefix) {
      return map;
    }
    for (var i in origins) {
      if (0 === i.indexOf(prefix + ':')) {
        map[i.slice(1 + prefix.length)] = clone(origins[i]);
      }
    }

    return map;
  };

  return _me;
};

