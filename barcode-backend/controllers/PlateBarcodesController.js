const apiResponse = require('../helpers/apiResponse');
const barcodeModel = require('../models/BarcodeGenModel');
const { generateUniqueBarcode, getCatFact } = require('../services/services');
const { query } = require('express-validator');
const { logger } = require('../helpers/winston');
const fs = require('fs');

/**
 * Returns a unique plate barcode
 *
 * @type {*[]}
 */
exports.generateUniqueBarcode = [
  function (req, res) {
    const plateTypeList = 'IGOPlateTypes';
    let plateTypesPromise = cache.get(`${plateTypeList}-Picklist`, () => services.getPicklist(plateTypeList));
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

exports.writeToFile = [
  function (req, res) {
    console.log('info', 'Writing CSV File');
    let file = req.body.fileName;
    let content = req.body.fileData;

      fs.access('/mnt/mohibullahlab/Sample and Project Management/PlateBarcodePrinterFile/IGO-Unique-barcodes.csv', (err) => {
        console.log(`${err ? `does not exist ${err}` : 'exists'}`);
      });

      fs.writeFile(`/mnt/mohibullahlab/Sample and Project Management/PlateBarcodePrinterFile/IGO-Unique-barcodes.csv`, content, (err) => {
        if (err) {
          return apiResponse.errorResponse(res, `Could not write to CSV file. ${err}`);
        } else {
          return apiResponse.successResponse(res, 'Successfully exported file');
        }
      });
  }
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

exports.picklist = [
  query('picklist').isLength({ min: 1 }).trim().withMessage('Picklist must be specified.'),
  function (req, res) {
      try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return apiResponse.validationErrorWithData(res, 'Validation error.', errors.array());
          } else {
              let picklist = req.query.picklist;
              cache
                  .get(picklist + '-Picklist', () => services.getPicklist(picklist))
                  .then((picklistResult) => {
                      if (picklistResult) {
                          return apiResponse.successResponseWithData(res, 'Operation success', {
                              listname: picklist,
                              picklist: picklistResult,
                          });
                      } else {
                          return apiResponse.errorResponse(res, `Could not retrieve picklist '${picklist}'.`);
                      }
                  });
          }
      } catch (err) {
          return apiResponse.errorResponse(res, err);
      }
  },
];
