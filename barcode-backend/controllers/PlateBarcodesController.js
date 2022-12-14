const apiResponse = require('../helpers/apiResponse');
const barcodeModel = require('../models/BarcodeGenModel');
const { generateUniqueBarcode, getCatFact } = require('../services/services');
const { logger } = require('../helpers/winston');

/**
 * Returns a unique plate barcode
 *
 * @type {*[]}
 */
exports.generateUniqueBarcode = [
  function (req, res) {
    console.log('info', 'Generating plate barcode');
    let plateType = req.query.plateType;
    let numberOfBarcodes = req.query.numOfBarcodes;

    // let barcodeGeneratePromise = barcodeModel.findOne({plateType: plateType});
    generateUniqueBarcode(plateType, numberOfBarcodes)
    // Promise.all([barcodeGeneratePromise])
      .then((results) => {
        console.log(results);
        if (!results) {
          return apiResponse.errorResponse(res, `Could not generate barcodes.`);
        }
        return apiResponse.successResponseWithData(res, 'success', results);
      })
      .catch((err) => {
        return apiResponse.errorResponse(res, err.message);
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

exports.getCatFact = [
  function (req, res) {
    getCatFact()
      .then((fact) => {
        console.log(fact);
        return apiResponse.successResponseWithData(res, 'success', fact);
      })
      .catch((response) => {
        console.log('error');
        return apiResponse.errorResponse(res, 'no cat facts');
      });
  },
];
