# Paths
build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json

# NPX functions
tsc := node_modules/.bin/tsc
ts_node := node_modules/.bin/ts-node
mocha := node_modules/.bin/mocha
eslint := node_modules/.bin/eslint

.IGNORE: clean-linux

main: start-offline

start-offline:
	@echo "[INFO] Starting Offline Server"
	@NODE_ENV=development \
	serverless offline --stage devl

build:
	@echo "[INFO] Building for production"
	@NODE_ENV=production $(tsc) --p $(build)

deploy:
	@echo "[INFO] Deploy"
	@NODE_ENV=production \
	AWS_ACCESS_KEY_ID=$(ACKI) \
	AWS_SECRET_ACCESS_KEY=$(ASAK) \
	serverless deploy --region us-east-1

remove:
	@echo "[INFO] Remove"
	@NODE_ENV=production \
	AWS_ACCESS_KEY_ID=$(ACKI) \
	AWS_SECRET_ACCESS_KEY=$(ASAK) \
	serverless remove --region us-east-1

init-database-develop:
	@echo "[INFO] Initiating Database"
	@NODE_ENV=development \
	DEVELOPMENT_AWS_ACCESS_KEY_ID=$(ACKI) \
	DEVELOPMENT_AWS_SECRET_ACCESS_KEY=$(ASAK) \
	$(ts_node) script/init-database.ts

delete-database-develop:
	@echo "[INFO] Deleting Database"
	@NODE_ENV=development \
	DEVELOPMENT_AWS_ACCESS_KEY_ID=$(ACKI) \
	DEVELOPMENT_AWS_SECRET_ACCESS_KEY=$(ASAK) \
	$(ts_node) script/delete-database.ts

init-database-production:
	@echo "[INFO] Initiating Database Production"
	@NODE_ENV=production \
	DEVELOPMENT_AWS_ACCESS_KEY_ID=$(ACKI) \
	DEVELOPMENT_AWS_SECRET_ACCESS_KEY=$(ASAK) \
	$(ts_node) script/init-database.ts

run-script:
	@echo "[INFO] Running Script $(SCRIPT)"
	@NODE_ENV=development \
	$(ts_node) script/$(SCRIPT).ts

run-script-production:
	@echo "[INFO] Running Script $(SCRIPT) Production"
	@NODE_ENV=production \
	$(ts_node) script/$(SCRIPT).ts

tests:
	@echo "[INFO] Testing with Mocha"
	@NODE_ENV=test \
	$(mocha) --config test/.mocharc.json

cov:
	@echo "[INFO] Testing with Nyc and Mocha"
	@NODE_ENV=test \
	nyc $(mocha) --config test/.mocharc.json

lint:
	@echo "[INFO] Linting"
	@NODE_ENV=production \
	$(eslint) . --ext .ts,.tsx \
	--config ./typescript/.eslintrc.json

lint-fix:
	@echo "[INFO] Linting and Fixing"
	@NODE_ENV=development \
	$(eslint) . --ext .ts,.tsx \
	--config ./typescript/.eslintrc.json --fix

install:
	@echo "[INFO] Installing Development Dependencies"
	@yarn install --production=false

install-prod:
	@echo "[INFO] Installing Dependencies"
	@yarn install --production=true

outdated: install
	@echo "[INFO] Checking Outdated Dependencies"
	@yarn outdated

ci: tests lint build
