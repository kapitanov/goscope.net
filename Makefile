.PHONY: all help install run build test lint preview deploy

COMMIT_HASH=$(shell git log --pretty=format:%h -n 1)
COMMIT_MESSAGE=$(shell git log --pretty=format:%s -n 1)
COMMIT_BRANCH=main

all: install build test lint

help:
	@echo "make [install|run|build|test|lint|format|preview|deploy]"
	@exit 1

install:
	npm install

_install_fast:
	@[ ! -d "./node_modules" ] && npm install || true

run: _install_fast version
	npm run dev

build: _install_fast version
	NITRO_PRESET=cloudflare npx nuxi build --preset=cloudflare_pages

version:
	@echo "export const commitHash = '$(COMMIT_HASH)';" > ./version.ts
	@echo "export const buildDate = '$(shell date -u +"%Y-%m-%dT%H:%M:%SZ")';" >> ./version.ts

test: _install_fast
	npm run test

lint: _install_fast
	npm run lint

format: _install_fast
	npm run format

preview: _install_fast build
	cd dist && npx wrangler pages dev .

deploy:
	@[ -z "$(CLOUDFLARE_ACCOUNT_ID)" ] && echo "CLOUDFLARE_ACCOUNT_ID is not set" && exit 1 || true
	@[ -z "$(CLOUDFLARE_API_TOKEN)" ] && echo "CLOUDFLARE_API_TOKEN is not set" && exit 1 || true
	@[ -z "$(CLOUDFLARE_PROJECT_NAME)" ] && echo "CLOUDFLARE_PROJECT_NAME is not set" && exit 1 || true

	cd dist && npx wrangler pages deploy --project-name="$(CLOUDFLARE_PROJECT_NAME)" --branch="$(COMMIT_BRANCH)" --commit-hash="$(COMMIT_HASH)" --commit-message="$(COMMIT_MESSAGE)" --commit-dirty=true --skip-caching .

smoketest:
	@[ -z "$(SITEMAP_URL)" ] && echo "SITEMAP_URL is not set" && exit 1 || true

	@URLS=$$(curl -s "$(SITEMAP_URL)" | grep -o '<loc>.*</loc>' | sed 's/<loc>\(.*\)<\/loc>/\1/g'); \
	for URL in $$URLS; do \
		STATUS=$$(curl -s -o /dev/null -w "%{http_code}" "$$URL"); \
		echo "GET $$URL -> $$STATUS"; \
		if [ "$$STATUS" -ne 200 ]; then \
			echo "Error: $$URL returned $$STATUS"; \
			exit 1; \
		fi; \
	done
