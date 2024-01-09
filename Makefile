default:
	@echo "make [install|run|build|preview|deploy]"
	@exit 1

install:
	npm install

run: install
	npm run dev

build: install
	npm run generate

preview: install
	npm run preview

deploy:
	@[ -z "$(AWS_ACCESS_KEY_ID)" ] && echo "AWS_ACCESS_KEY_ID is not set" && exit 1 || true
	@[ -z "$(AWS_SECRET_ACCESS_KEY)" ] && echo "AWS_SECRET_ACCESS_KEY is not set" && exit 1 || true
	@[ -z "$(AWS_BUCKET)" ] && echo "AWS_BUCKET is not set" && exit 1 || true
	@[ -z "$(AWS_REGION)" ] && echo "AWS_REGION is not set" && exit 1 || true
	@[ -z "$(AWS_DISTRIBUTION_ID)" ] && echo "AWS_DISTRIBUTION_ID is not set" && exit 1 || true

	aws s3 sync "./.output/public/" "s3://$(AWS_BUCKET)/" --region "$(AWS_REGION)"
	INVALIDATION_ID=$$(aws cloudfront create-invalidation --distribution-id "$(AWS_DISTRIBUTION_ID)" --paths "/*" --region "$(AWS_REGION)" --output text --query "Invalidation.Id"); \
	aws cloudfront wait invalidation-completed --distribution-id "$(AWS_DISTRIBUTION_ID)" --id "$$INVALIDATION_ID" --region "$(AWS_REGION)"
	aws s3 sync "./.output/public/" "s3://$(AWS_BUCKET)/" --region "$(AWS_REGION)" --delete
