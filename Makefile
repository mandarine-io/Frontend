################################################################################################################
.PHONY: env
env:
	@cp ./env/.env.example .env

#################################################

.PHONY: init
init:
	npm install -g @ionic/cli
	npm install
	npx cap add android

#################################################

.PHONY: dev
dev:
	ionic serve

#################################################

.PHONY: deploy-android
deploy-android:
	ionic build
	npx cap run android
