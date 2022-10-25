var express = require('express');
var barcodeRouter = require('./barcode');

var app = express();

app.use('/getBarcode/', barcodeRouter);

module.exports = app;
