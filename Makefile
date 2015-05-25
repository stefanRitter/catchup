test:
	@NODE_ENV=test node node_modules/lab/bin/lab server/config/__tests__ server/models/__tests__
test-cov:
	@NODE_ENV=test node node_modules/lab/bin/lab test/server -t 100
test-cov-html:
	@NODE_ENV=test node node_modules/lab/bin/lab -r html -o coverage.html

.PHONY: test test-cov test-cov-html
