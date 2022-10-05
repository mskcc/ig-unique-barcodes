var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BarcodeSchema = new Schema({
  plateType: {type: String, required: true},
  countOfBarcodes: {type: String, required: true}
});

module.exports = mongoose.model('Barcode', BarcodeSchema);
