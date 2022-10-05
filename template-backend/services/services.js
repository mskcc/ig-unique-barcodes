const BarcodeGenModel = require('../models/BarcodeGenModel');
// const { getNumQuotes } = require('../models/setup_deleteMe');
const axios = require('axios');

/**
 * Returns unique barcodes 
 * @returns {Promise<*>}
 */
exports.getUniqueBarcode = async function () {

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
