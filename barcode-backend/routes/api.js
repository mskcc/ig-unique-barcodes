var express = require('express');
var barcodeRouter = require('./barcode');

var app = express();

app.use('/getBarcode/', barcodeRouter);
app.use('/exportExcel/', barcodeRouter);

module.exports = app;
