/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

module.exports = function (s) {
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
