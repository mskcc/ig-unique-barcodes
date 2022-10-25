const apiResponse = require('../helpers/apiResponse');
const { authenticateRequest } = require('../middlewares/jwt-cookie');
const { generateUniqueBarcode, getCatFact } = require('../services/services');
// const Cache = require('../helpers/cache');
// const ttl = 60 * 60 * 1; // cache for 1 Hour
// const cache = new Cache(ttl); // Create a new cache service instance
const { logger } = require('../helpers/winston');

/**
 * Returns a unique plate barcode
 *
 * @type {*[]}
 */
exports.generateUniqueBarcode = [
  authenticateRequest,
  function (req, res) {
    logger.log('info', 'Generating plate barcode');
    let plateType = req.params.plateType;
    let numberOfBarcodes = req.params.numOfBarcodes;
    generateUniqueBarcode(plateType, numberOfBarcodes)
      .then((barcode) => {
        return apiResponse.successResponseWithData(res, 'success', barcode);
      })
      .catch((err) => {
        return apiResponse.ErrorResponse(res, err.message);
      });
  },
];

exports.getNumOfBarcodes = [
  function (req, res) {
    if(typeof req.body.count === 'undefined'){
        // The parameter is missing, example response...
        res.status(400).json({ error: 'missing parameter count', data: null });
        return;
      }
    return req.body.count;
    // res.status(200).json({ error: null, data: req.body.count});
  },
];
/**
 * Returns a single quote for the period of the cache, see @ttl
 * @type {*[]}
 */
// exports.getQuoteOfDay = [
//   authenticateRequest,
//   function (req, res) {
//     // Cache quote for the entire day - no need to query the DB
//     const key = 'GENERATE_PLATE_BARCODE';
//     logger.log('info', 'Generating Plate Barcode');
//     const retrievalFunc = () => getRandomQuote();
//     return cache
//       .get(key, retrievalFunc)
//       .then((quote) => {
//         return apiResponse.successResponseWithData(res, 'success', quote);
//       })
//       .catch((err) => {
//         return apiResponse.ErrorResponse(res, err.message);
//       });
//   },
// ];

exports.getCatFact = [
  authenticateRequest,
  function (req, res) {
    getCatFact()
      .then((fact) => {
        console.log(fact);
        return apiResponse.successResponseWithData(res, 'success', fact);
      })
      .catch((response) => {
        console.log('error');
        return apiResponse.ErrorResponse(res, 'no cat facts');
      });
  },
];
