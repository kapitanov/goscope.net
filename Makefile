.PHONY: all help install run build test lint preview deploy

COMMIT_HASH=$(shell git log --pretty=format:%h -n 1)
COMMIT_MESSAGE=$(shell git log --pretty=format:%s -n 1)
COMMIT_BRANCH=main

all: install build test lint

help:
	@echo "make [install|run|build|test|lint|format|preview|deploy]"
	@exit 1

prepare:
	echo "export const commitHash = '$(COMMIT_HASH)';" > ./config.ts; \
	echo "export const buildDate = '$(shell date -u +"%Y-%m-%dT%H:%M:%SZ")';" >> ./config.ts; \
	echo "export const cloudflareWebAnalyticsToken = '$(CLOUDFLARE_WEB_ANALYTICS_TOKEN)';" >> ./config.ts; \
	echo "export const environment = '$(ENV)';" >> ./config.ts; \


install: prepare
	@[ ! -d "./node_modules" ] && npm install || true

run: install prepare
	npm run dev

build: install prepare
	NITRO_PRESET=cloudflare npx nuxi build --preset=cloudflare_pages

test: install
	npm run test

lint: install
	npm run lint

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

	@TEST_URL="$(ROOT_URL)" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/goroutines" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/goroutines/" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/goroutines/demo" make _smoketest_url
	@TEST_URL="$(ROOT_URL)/goroutines/demo/" make _smoketest_url

_smoketest_url:
	@[ -z "$(TEST_URL)" ] && echo "TEST_URL is not set" && exit 1 || true

	@STATUS=$$(curl -s -o /dev/null -w "%{http_code}" "$$TEST_URL"); \
	echo "GET $$TEST_URL -> $$STATUS"; \
	if [ "$$STATUS" -ne 200 ]; then \
		exit 1; \
	fi;
