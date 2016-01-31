TESTS=test;

test:
	node_modules/.bin/lab -m 5000 -v $(TESTS)

coverage:
	node_modules/.bin/lab -m 5000 -v -r console -o stdout -r html -o ./coverage/coverage.html $(TESTS)

.PHONY: test coverage