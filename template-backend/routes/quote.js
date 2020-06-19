var express = require('express');
const QuotesController = require('../controllers/QuotesController');
var router = express.Router();

router.get('/', QuotesController.getRandomQuote);
router.get('/qod', QuotesController.getQuoteOfDay);

module.exports = router;
