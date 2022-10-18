var express = require('express');
var barcodeRouter = require('./barcode');

var app = express();

app.use('/plateBarcode', barcodeRouter);

module.exports = app;
