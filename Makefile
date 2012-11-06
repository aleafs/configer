TESTS = test/*.test.js
REPORTER = spec
TIMEOUT = 5000
JSCOVERAGE = ./node_modules/visionmedia-jscoverage/jscoverage --encoding=utf-8
MOCHA = ./node_modules/mocha/bin/mocha

all: test install

install:
	@npm install

test: install
	@NODE_ENV=test $(MOCHA) --reporter $(REPORTER) --timeout $(TIMEOUT) \
		$(MOCHA_OPTS) $(TESTS)

cov: install
	@npm install visionmedia-jscoverage@1.0.0
	-rm -rf lib.bak
	-mv -f lib lib.bak && ${JSCOVERAGE} lib.bak lib
	-$(MOCHA) --reporter html-cov --timeout $(TIMEOUT) $(MOCHA_OPTS) $(TESTS) > ./coverage.html
	-rm -rf lib && mv -f lib.bak lib

.PHONY: all
