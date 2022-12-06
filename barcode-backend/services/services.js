const barcodModel = require('../models/BarcodeGenModel')
const axios = require('axios');
const { logger } = require('../helpers/winston');

/**
 * Returns unique barcodes 
 * @returns {Promise<*>}
 */
exports.generateUniqueBarcode = async function (plateType, NumberOfBarcodes) {
  var listOfBarcodes = [];
  console.log('plate type is: ' + plateType);
  var year = new Date().getFullYear().toString().substring(2, 5);
  console.log('Year is: ' + year);
  let counter;
  console.log('NumberOfBarcodes = ' + NumberOfBarcodes);
  const result = await barcodModel.findOne({plateType: plateType});
  if (result == null) return;
  console.log('After find.. Counter = ' + result.counter);
  counter = result.counter;
  let padded = false;
  let prevCountOfTraillingZeros = 0;
  for (let i = 0; i < NumberOfBarcodes; i++) {
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
    await barcodModel.findOneAndUpdate({plateType: plateType},{$set: { counter: newCounter }});
    console.log('Updated the last index by one')  
  }
  return listOfBarcodes;
};

exports.getCatFact = async function () {
  return axios
    .get('https://catfact.ninja/fact')
    .then((response) => {
      return { fact: response.data.fact };
    })
    .catch((error) => {
      // console.log(error);
      // return 'Could not retrieve a cat fact';
      throw error;
    })
    .then((response) => {
      return response;
    });
};