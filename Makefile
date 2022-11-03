deploy:
	cd ./barcode-frontend && npm run build && cd - && \
	cd ./barcode-backend && npm run clean && cp -rf ../barcode-frontend/build ./public && cd - && \
	rsync -a ./barcode-backend/ [HOST]:deployments/igo-unique-barcodes
