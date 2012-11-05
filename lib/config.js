/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

var fs = require('fs');
var trim = require('quicktrim').trim;
var clone = require('clone');
var util = require('util');
var events = require('events').EventEmitter;

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

exports.create = function(file, reload) {

  var options = {
    'autoreload'  : parseInt(reload, 10) || 0,
  };

  var origins = {};

  var extension = normalize(file.split('.').pop());
  if (!__configParsers[extension]) {
    throw new Error('UndefinedConfigParser');
  }

  try {
    origins = __configParsers[extension](fs.readFileSync(file, 'utf8'));
  } catch (e) {
    // XXX: error for config file should be throw out
    throw e;
  }

  /* {{{ private function autoReload() */
  /**
   * @ 文件变更时间戳
   */
  var mtime = null;
  var _autoReload = function (cb) {
    fs.stat(file, function (e, s) {
      if (e || s.mtime <= mtime) {
        setTimeout(function () {
          _autoReload(cb);
        }, options.autoreload);
        return;
      }
      fs.readFile(file, 'utf8', function (e, d) {
        if (!e) {
          origins = __configParsers[extension](d);
          mtime = s.mtime;
          cb && cb();
        }
        setTimeout(function () {
          _autoReload(cb);
        }, options.autoreload);
      });
    });
  };
  /* }}} */

  var Config = function () {
    events.call(this);
    var _self = this;
    options.autoreload && _autoReload(function () {
      _self.emit('reload');
    });
  };
  util.inherits(Config, events);

  Config.prototype.get = function (key, _default) {
    return origins[key] ? clone(origins[key]) : _default;
  };

  Config.prototype.find = function (prefix) {
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

  Config.prototype._getAll = function () {
    return clone(origins);
  };

  return new Config();
};

