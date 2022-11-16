const apiResponse = require('../helpers/apiResponse');
const barcodeModel = require('../models/BarcodeGenModel');
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
  function (req, res) {
    console.log('info', 'Generating plate barcode');
    let plateType = req.query.plateType;
    let numberOfBarcodes = req.query.numOfBarcodes;

    let listOfBarcodes = [];
    console.log('plate type is: ' + plateType);
    let year = new Date().getFullYear().toString().substring(2, 5);
    console.log('Year is: ' + year);
    let counter;
    console.log('NumberOfBarcodes = ' + numberOfBarcodes);

    let barcodeGeneratePromise = barcodeModel.findOne({plateType: plateType});
    // generateUniqueBarcode(plateType, numberOfBarcodes)
    Promise.all([barcodeGeneratePromise])
      .then((results) => {
        const result = results[0];
        console.log('After find.. Counter = ' + result.counter);
        counter = result.counter;
        let padded = false;
        let prevCountOfTraillingZeros = 0;
        for (let i = 0; i < numberOfBarcodes; i++) {
          // MSK_DNA_2200001
          console.log('in for loop counter = ' + counter);
          newCounter = parseInt(counter) + 1;
          counter = newCounter;
          console.log('newCounter = ' + newCounter);
          let countOfTraillingZeros = 5 - String(newCounter).length;
          console.log('number or trailing zeros = ' + countOfTraillingZeros);
          if (!padded && countOfTraillingZeros != prevCountOfTraillingZeros) {
            year = year.padEnd(String(year).length + countOfTraillingZeros, '0');
            prevCountOfTraillingZeros = countOfTraillingZeros;
            padded = true;
            console.log('year after padding to the end: ' + String(year))
          }
          let uniquePlateBarcode = String(plateType) + "_" + String(year) + newCounter;
          listOfBarcodes.push(uniquePlateBarcode);
          console.log('pushed ' + uniquePlateBarcode);
          barcodeModel.findOneAndUpdate({plateType: plateType},{$set: { counter: newCounter }});
          console.log('Updated the last index by one')
        }

        // if (!results) {
        //   return apiResponse.errorResponse(res, `Could not generate barcodes.`);
        // }
        return apiResponse.successResponseWithData(res, 'success', listOfBarcodes);
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
