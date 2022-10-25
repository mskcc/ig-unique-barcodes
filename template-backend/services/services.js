// const BarcodeGenModel = require('../models/BarcodeGenModel');
const numOfBarcodes = require('../Controllers/PlateBarcodesController');
const axios = require('axios');
//const client = new MongoClient();
var MongoClient = require('mongodb').MongoClient;
const { logger } = require('../helpers/winston');
MongoClient.connect(process.env.MONGODB_URL);

async function findLastIndexByPlateType(plateType) {
  const result = MongoClient.db("plate-barcodes").collection("plateTypeLastIndex")
                      .findOne({"plateType" : plateType });
  if (result) {
      console.log(`Last index found for plate type '${plateType}':`);
      console.log(result);
  } else {
      console.log(`No last index found for the plate type '${plateType}'`);
  }
}

async function updateLastIndexByNumberOfGeneratedtedBarcodes(MongoClient, plateType, lastIndex) {
  const result = MongoClient.db("plate-barcodes").collection("plateTypeLastIndex")
                      .updateOne({ "plateType" : plateType }, { $set: lastIndex + 1 });
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

/**
 * Returns unique barcodes 
 * @returns {Promise<*>}
 */
exports.generateUniqueBarcode = async function (plateType, NumberOfBarcodes) {
  var listOfBarcodes = [];
  logger.log('plate type is: ' + plateType)
  for (let i = 0; i < NumberOfBarcodes; i++) {
    // let uniquePlateBarcode;
    let year = new Date().getFullYear().substring(3, 5);
    // MSK_DNA_2200001
    let counter = await findLastIndexByPlateType(plateType);
    let counterLength = counter.toString().length;
    let countOfTraillingZeros = 5 - counterLength;
    let uniquePlateBarcode = plateType + "_" + year;
    String(year).padEnd(countOfTraillingZeros, '0');
    uniquePlateBarcode += counter;
    counter += 1;
    const barcodsJson = uniquePlateBarcode.toJSON();
    listOfBarcodes.push(barcodsJson);
  }
  updateLastIndexByNumberOfGeneratedtedBarcodes(client, plateType, counter);
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
