.PHONY: all help install run build test lint preview deploy

all: install build test lint

help:
	@echo "make [install|run|build|test|lint|format|preview|deploy]"
	@exit 1

install:
	npm install

_install_fast:
	@[ ! -d "./node_modules" ] && npm install || true

run: _install_fast
	npm run dev

build: _install_fast
	NITRO_PRESET=cloudflare npx nuxi build --preset=cloudflare_pages

test: _install_fast
	npm run test

lint: _install_fast
	npm run lint

format: _install_fast
	npm run format

preview: _install_fast
	npm run preview

deploy:
	@[ -z "$(CLOUDFLARE_ACCOUNT_ID)" ] && echo "CLOUDFLARE_ACCOUNT_ID is not set" && exit 1 || true
	@[ -z "$(CLOUDFLARE_API_TOKEN)" ] && echo "CLOUDFLARE_API_TOKEN is not set" && exit 1 || true
	@[ -z "$(CLOUDFLARE_PROJECT_NAME)" ] && echo "CLOUDFLARE_PROJECT_NAME is not set" && exit 1 || true

	cd dist && npx wrangler pages deploy --project-name="$(CLOUDFLARE_PROJECT_NAME)" --branch=main --commit-dirty=true --skip-caching .
