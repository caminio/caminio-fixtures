TESTS = $(shell find test -name "*.test.js")
MOCHA_OPTS= --check-leaks --bail
REPORTER=spec
export NODE_ENV=test
export nginios_FIXTURES_TEST=1

test:
	@./node_modules/.bin/mocha --reporter $(REPORTER) $(MOCHA_OPTS) test/*.test.js

lib-cov:
	@./node_modules/.bin/jscoverage lib lib-cov

html-cov: lib-cov
	@nginios_COV=1 ./node_modules/.bin/mocha --reporter html-cov > coverage.html

coverage:	html-cov

clean:
	rm -f coverage.html
	rm -rf lib-cov

.PHONY: test clean
