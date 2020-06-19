deploy:
	cd ./template-frontend && npm run build && cd - && \
	cd ./template-backend && npm run clean && cp -rf ../template-frontend/build ./public && cd - && \
	rsync -a ./template-backend/ [HOST]:deployments/app-template
