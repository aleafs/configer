/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

var trim = require('quicktrim').trim;

var clean = function (s) {
  if (/^-?(\d|\.)+$/.test(s)) {
    return s - 0;
  }

  var _me = [];

  s = s.replace(/^("|')+/, '').replace(/("|')+$/, '');
  for (var i = 0; i < s.length; i++) {
    var the = s.slice(i, i + 1);
    if ('\\' == the) {
      i++;
      _me.push(s.slice(i, i + 1));
    } else {
      _me.push(the);
    }
  }

  return _me.join('');
};

exports.parse = function (data) {
  var result = {};
  data.toString().split('\n').forEach(function (row) {
    row = trim(row);
    if (!row.length || ';' === row.slice(0, 1)) {
      return;
    }

    var match = row.match(/^\s*\[([^\]]+)\]\s*$/);
    if (match) {
      sect = match[1];
      result[sect] = {};
    } else {
      var match = line.match(/^\s*([^=\s]+)\s*=\s*(.*)\s*$/);
      if (!match) {
        return;
      }

      var key = match[1];
      var tmp = clean(match[2]);
      if (sect) {
        result[sect][key] = tmp;
      } else {
        result[key] = tmp;
      }
    }
  });

  return result;
};

