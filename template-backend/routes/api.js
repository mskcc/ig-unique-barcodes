var express = require('express');
var barcodeRouter = require('./barcodeGen');

var app = express();

app.use('/plateBarcode/', barcodeRouter);

module.exports = app;
