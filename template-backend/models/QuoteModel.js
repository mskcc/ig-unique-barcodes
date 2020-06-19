var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuoteSchema = new Schema({
  quote: {type: String, required: true},
  author: {type: String, required: true},
  id: {type: Number, required: true}
});

module.exports = mongoose.model('Quote', QuoteSchema);
