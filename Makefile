## DEVELOPMENT
.PHONY: build-functions
build-functions:
	npm run build

.PHONY: serve
serve:
	npm run serve

.PHONY: watch-functions
watch-functions:
	npm run watch

# DEPLOYMENT
.PHONY: prepare-cfn-parameters
prepare-cfn-parameters:
	@jq 'to_entries | map_values (.key + "=" + .value) | join (" ")' ./etc/cloudformation.parameters.json -r
