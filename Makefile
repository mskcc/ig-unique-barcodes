deploy:
	cd ./barcode-frontend-react && npm run build && cd - && \
	cd ./barcode-backend && npm run clean && npm install && cp -rf ../barcode-frontend-react/build ./public && cd - && \
	rsync -a ./barcode-backend/ [HOST]:deployments/igo-unique-barcodes
