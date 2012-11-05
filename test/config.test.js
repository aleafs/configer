/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

var should  = require('should');
var config  = require(__dirname + '/../');

describe('file config', function() {

  /* {{{ should_ini_config_works_fine() */
  it('should_ini_config_works_fine', function() {
    var cfg	= config.create(__dirname + '/ini/test_config_file.ini');
    cfg.all().should.eql({
      'key1'    : '',
      'key2'    : 0.01,
      'key3'    : 10,
      'key4'    : -213,
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
    cfg.find('sec1').should.eql({
      'default' : {
        'key1'  : 'aa',
        'key3'  : 'bb',
      },
    });
    cfg.find('').should.eql({});
  });
  /* }}} */

});
