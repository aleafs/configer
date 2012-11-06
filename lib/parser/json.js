/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

var trim = require('fasttrim').trim;

exports.parse = function (data) {
  return JSON.parse(trim(data));
};
