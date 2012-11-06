/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

var trim = require('fasttrim').trim;
var clean = require(__dirname + '/../clean.js');

exports.parse = function (data) {

  var result = {};

  var section;

  data.toString().split('\n').forEach(function (row) {
    row = trim(row);
    if (!row.length || ';' === row.slice(0, 1)) {
      return;
    }

    var match = row.match(/^\s*\[([^\]]+)\]\s*$/);
    if (match) {
      section = match[1];
      result[section] = {};
    } else {
      var match = row.match(/^\s*([^=\s]+)\s*=\s*(.*)\s*$/);
      if (!match) {
        return;
      }

      var key = match[1];
      var tmp = clean(match[2]);
      if (section) {
        result[section][key] = tmp;
      } else {
        result[key] = tmp;
      }
    }
  });

  return result;
};

