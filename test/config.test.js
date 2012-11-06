/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

var should  = require('should');
var fs = require('fs');
var config  = require(__dirname + '/../');

describe('file config', function() {

  /* {{{ exception_test() */
  it('exception_test', function () {
    try {
      var cfg = config.create('./a.i_am_not_found');
      (true).should.eql(false);
    } catch (e) {
      e.toString().should.include('UndefinedConfigParser');
    }

    try {
      var cfg = config.create('./i_am_not_found.ini');
      (true).should.eql(false);
    } catch (e) {
      e.toString().should.include('no such file or directory \'./i_am_not_found.ini\'');
    }
  });
  /* }}} */

  /* {{{ should_ini_config_works_fine() */
  it('should_ini_config_works_fine', function() {
    var cfg	= config.create(__dirname + '/ini/test_config_file.ini');
    cfg._getAll().should.eql({
      'key1'    : '',
      'key2'    : 0.01,
      'key3'    : 10,
      'key4'    : -213,
      'key5'    : 0,
      'sec1'    : {
        'key1'  : 'a=b"c',
        'key2'  : '1',
      },
      'sec1:default'    : {
        'key1'  : 'aa',
        'key3'  : 'bb',
      },
      'iplist'  : {
        '127.0.0.1' : 30,
      },
    });
    cfg.get('key5').should.eql(0);
    cfg.find('sec1').should.eql({
      'default' : {
        'key1'  : 'aa',
        'key3'  : 'bb',
      },
    });
    cfg.find('').should.eql({});
  });
  /* }}} */

  /* {{{ should_file_autoload_works_fine() */
  it('should_file_autoload_works_fine', function (done) {
    var fname = __dirname + '/ini/config.json';
    var cdata = {
      'key1' : 'val1',
    'key2' : 21.23,
    'key3' : '21.23',
    'key4' : [
  {'a' : 'b', 'c' : [1, 2, 'x']}
  ]
    };
    fs.writeFile(fname, JSON.stringify(cdata) + '\r\n', function (e) {
      should.ok(!e);

      var _me = config.create(fname, 2);
      _me.get('key2').should.eql(21.23);
      _me.get('key3').should.eql('21.23');

      _me.on('reload', function () {
        _me.get('key2').should.eql(23.21);
        setTimeout(done, 10);
      });

      cdata.key2 = 23.21;
      fs.writeFile(fname, JSON.stringify(cdata), function (e) {
        should.ok(!e);
      });
    });
  });
  /* }}} */

});
