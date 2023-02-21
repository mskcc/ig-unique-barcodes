var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BarcodeSchema = new Schema({
  plateType: {type: String, required: true},
  counter: {type: String, required: true} //type: Number
}, { collection : 'plateTypeLastIndex' });

module.exports = mongoose.model('plateTypeLastIndex', BarcodeSchema);
