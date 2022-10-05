const apiResponse = require('../helpers/apiResponse');
const { authenticateRequest } = require('../middlewares/jwt-cookie');
const { generateUniquePlateBarcode, getCatFact } = require('../services/services');
// const Cache = require('../helpers/cache');
// const ttl = 60 * 60 * 1; // cache for 1 Hour
// const cache = new Cache(ttl); // Create a new cache service instance
const { logger } = require('../helpers/winston');

/**
 * Returns a unique plate barcode
 *
 * @type {*[]}
 */
exports.generateUniquePlateBarcode = [
  authenticateRequest,
  function (req, res) {
    logger.log('info', 'Generating plate barcode');
    generateUniquePlateBarcode()
      .then((barcode) => {
        return apiResponse.successResponseWithData(res, 'success', barcode);
      })
      .catch((err) => {
        return apiResponse.ErrorResponse(res, err.message);
      });
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
