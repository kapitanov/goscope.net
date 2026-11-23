.PHONY: all help install run build test lint typecheck preview deploy

COMMIT_HASH=$(shell git log --pretty=format:%h -n 1)
COMMIT_MESSAGE=$(shell git log --pretty=format:%s -n 1)
COMMIT_BRANCH=main

all: install build test lint typecheck

help:
	@echo "make [install|run|build|test|lint|format|preview|deploy]"
	@exit 1

prepare:
	@echo "export const commitHash = '$(COMMIT_HASH)';" > ./config.ts
	@echo "export const buildDate = '$(shell date -u +"%Y-%m-%dT%H:%M:%SZ")';" >> ./config.ts
	@echo "export const googleAnalyticsToken = '$(GOOGLE_ANALYTICS_TOKEN)';" >> ./config.ts
	@echo "export const environment = '$(ENV)';" >> ./config.ts
	@echo "export const featureFlags = ["  >> ./config.ts; \
	env | cut -d'=' -f1 | grep 'FEATURE_' | xargs -I {} echo "  '{}',"  >> ./config.ts; \
	echo "];" >> ./config.ts

install: prepare
	@if [ ! -d "./node_modules" ]; then npm ci; fi

dev: install prepare
	@ENV="development" make util-dev

util-dev: install prepare
	npm run dev

build: install prepare
	NITRO_PRESET=cloudflare npm run build

test: install
	npm run test

lint: install
	npm run lint

typecheck: install
	npm run typecheck

format: install
	npm run format

preview: install build
	cd dist && npx wrangler pages dev .

deploy:
	@[ -z "$(CLOUDFLARE_ACCOUNT_ID)" ] && echo "CLOUDFLARE_ACCOUNT_ID is not set" && exit 1 || true
	@[ -z "$(CLOUDFLARE_API_TOKEN)" ] && echo "CLOUDFLARE_API_TOKEN is not set" && exit 1 || true
	@[ -z "$(CLOUDFLARE_PROJECT_NAME)" ] && echo "CLOUDFLARE_PROJECT_NAME is not set" && exit 1 || true

	cd dist && npx wrangler pages deploy --project-name="$(CLOUDFLARE_PROJECT_NAME)" --branch="$(COMMIT_BRANCH)" --commit-hash="$(COMMIT_HASH)" --commit-message="$(COMMIT_MESSAGE)" --commit-dirty=true --skip-caching .

smoketest:
	@[ -z "$(ROOT_URL)" ] && echo "ROOT_URL is not set" && exit 1 || true

	@TEST_URL="$(ROOT_URL)" EXPECT_TEXT="Goroutines viewer" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/" EXPECT_TEXT="Goroutines viewer" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/goroutines" EXPECT_TEXT="Goroutines viewer" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/goroutines/" EXPECT_TEXT="Goroutines viewer" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/goroutines/demo" EXPECT_TEXT="Displaying demo data" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/goroutines/demo/" EXPECT_TEXT="Displaying demo data" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/benchmark" EXPECT_TEXT="Benchmark visualizer" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/benchmark/" EXPECT_TEXT="Benchmark visualizer" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/benchmark/demo" EXPECT_TEXT="Displaying demo data" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/benchmark/demo/" EXPECT_TEXT="Displaying demo data" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/benchmark/compare" EXPECT_TEXT="Benchmark comparer" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/benchmark/compare/" EXPECT_TEXT="Benchmark comparer" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/benchmark/compare/demo" EXPECT_TEXT="Displaying demo data" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/benchmark/compare/demo/" EXPECT_TEXT="Displaying demo data" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/logviz" EXPECT_TEXT="Log visualizer" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/logviz/" EXPECT_TEXT="Log visualizer" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/logviz/demo" EXPECT_TEXT="Displaying demo data" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/logviz/demo/" EXPECT_TEXT="Displaying demo data" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/privacy-policy" EXPECT_TEXT="Privacy Policy" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/terms" EXPECT_TEXT="Terms and conditions" make _smoketest_url

_smoketest_url:
	@[ -z "$(TEST_URL)" ] && echo "TEST_URL is not set" && exit 1 || true

	@STATUS=$$(curl -s -o /dev/null -w "%{http_code}" "$$TEST_URL"); \
	echo "GET $$TEST_URL -> $$STATUS"; \
	if [ "$$STATUS" -ne 200 ]; then \
		exit 1; \
	fi; \
	if [ -n "$(EXPECT_TEXT)" ]; then \
		if ! curl -s "$$TEST_URL" | grep -qF -- "$(EXPECT_TEXT)"; then \
			echo "GET $$TEST_URL: missing expected text: $(EXPECT_TEXT)"; \
			exit 1; \
		fi; \
	fi;
