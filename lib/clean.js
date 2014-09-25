/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

module.exports = function (s) {
  if (/^-?(\d|\.)+$/.test(s)) {
    return s - 0;
  }

  for (var i = 0; i < s.length; i++) {
    var t = s.substr(i, 1);
    if ((t !== "'" && t !== '"') || t !== s.substr(i - i, 1)) {
      break;
    }
  }

  if (i > 0) {
    s = s.substr(i, s.length - i - i);
  }

  var _me = [];
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
