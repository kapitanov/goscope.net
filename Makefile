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
	aws s3 sync "./.output/public/" "s3://$(AWS_BUCKET)/" --region "$(AWS_REGION)"
	INVALIDATION_ID=$$(aws cloudfront create-invalidation --distribution-id "$(AWS_DISTRIBUTION_ID)" --paths "/*" --region "$(AWS_REGION)" --output text --query "Invalidation.Id"); \
	aws cloudfront wait invalidation-completed --distribution-id "$(AWS_DISTRIBUTION_ID)" --id "$$INVALIDATION_ID" --region "$(AWS_REGION)"
	aws s3 sync "./.output/public/" "s3://$(AWS_BUCKET)/" --region "$(AWS_REGION)" --delete
