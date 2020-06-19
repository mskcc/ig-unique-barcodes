const QuoteModel = require('../models/QuoteModel');
const {getNumQuotes} = require('../models/setup_deleteMe');

/**
 * Returns a random quote in the database
 * @returns {Promise<*>}
 */
exports.getRandomQuote = async function() {
  const id = Math.floor(Math.random() * getNumQuotes());
  const quote = await QuoteModel.findOne({id});

  if(quote == null) return;

  // Redact data
  const quoteJson = quote.toJSON();
  delete quoteJson._id;
  delete quoteJson.id;
  delete quoteJson.__v;

  return quoteJson;
};
