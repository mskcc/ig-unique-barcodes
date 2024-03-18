const https = require('https');
const barcodModel = require('../models/BarcodeGenModel');
const axios = require('axios');

const LIMS_AUTH = {
  username: process.env.LIMS_USER,
  password: process.env.LIMS_PW,
};
const LIMS_URL = process.env.LIMS_URL;
const agent = new https.Agent({
  rejectUnauthorized: false,
});
const axiosConfig = {
  httpsAgent: agent
};
const formatData = function (resp) {
  const data = resp.data || [];
  return data;
};


/**
 * Returns unique barcodes 
 * @returns {Promise<*>}
 */
exports.generateUniqueBarcode = async function (plateType, NumberOfBarcodes) {
  var listOfBarcodes = [];
  var year = new Date().getFullYear().toString().substring(2, 5);
  let counter;
  const result = await barcodModel.findOne({plateType: plateType});
  // no barcodes for plateType yet
  if (result === null) {
    counter = 0;
  } else {
    counter = result.counter;
  }
  let padded = false;
  let prevCountOfTraillingZeros = 0;
  for (let i = 0; i < NumberOfBarcodes; i++) {
    // MSK_DNA_2200001
    let counterLengthFixed = true;
    let prevCounterLength = String(counter).length;
    let newCounter = parseInt(counter) + 1;
    let newCounterLength = String(newCounter).length;
    if (newCounterLength > prevCounterLength) {
      counterLengthFixed = false;
    }
    counter = newCounter;
    let countOfTraillingZeros = 5 - String(newCounter).length;
    
    if (!padded) {
      year = year.padEnd(String(year).length + countOfTraillingZeros, '0'); //padEnd(targetlength, pad string)
      padded = true;
    }
    if (!counterLengthFixed && padded) {
      year = new Date().getFullYear().toString().substring(2, 5);
      year = year.padEnd(String(year).length + countOfTraillingZeros, '0');
      counterLengthFixed = true;
    }
    let uniquePlateBarcode = String(plateType) + "_" + String(year) + newCounter;
    listOfBarcodes.push(uniquePlateBarcode.trim());
    await barcodModel.findOneAndUpdate({plateType: plateType},{$set: { counter: newCounter }}); 
  }
  return listOfBarcodes;
};

exports.getPlateListPicklist = () => {
  const url = `${LIMS_URL}/getPickListValues?list=Barcode+Plate+Types`;
    return axios
        .get(url, {
            auth: { ...LIMS_AUTH },
            ...axiosConfig,
        })
        .then((resp) => {
            return resp;
        })
        .catch((error) => {
            throw error;
        })
        .then((resp) => {
            return formatData(resp);
        });
};
