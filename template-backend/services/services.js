const barcodModel = require('../models/BarcodeGenModel')
// const numOfBarcodes = require('../Controllers/PlateBarcodesController');
const axios = require('axios');
const { logger } = require('../helpers/winston');
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URL;

// async function findOne(type) {

//   const client = await MongoClient.connect(url, { useNewUrlParser: true })
//       .catch(err => { console.log(err); });
//   if (!client) {
//       return;
//   }
//   try {
//       const db = client.db("plate-barcodes");
//       let collection = db.collection('plateTypeLastIndex');
//       let query = { plateType: type}
//       const projection = { _id: 0, plateType: 0, counter: 1 };
//       const res = collection.find(query).project(projection);
//       await res.forEach(console.dir);
//   } catch (err) {
//       console.log(err);
//   } finally {
//       client.close();
//   }
// }

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
  //MongoClient.connect(url, function (err, db) {
    //if (err) throw err;
    //var dbo = db.db("plate-barcodes");
  console.log('NumberOfBarcodes = ' + NumberOfBarcodes);
  const query = { "plateType": plateType};
  const projection = { _id: 0, plateType: 1, counter: 1 };
  const result = await barcodModel.findOne({plateType: plateType});
  // dbo.collection("plateTypeLastIndex").findOne({}, function(err, result) {
  // if (err) throw err;
  // console.log('result.name ' + result);
  // // console.log(result)
  // // console.log('last index of plate type: ' + plateType + ' is = ' + String(result));
  // // counter = result.counter;
  // });
  if (result == null) return;
  console.log('After find.. Counter = ' + result.counter);
  counter = result.counter;
  for (let i = 0; i < NumberOfBarcodes; i++) {
    // MSK_DNA_2200001
    console.log('in for loop counter = ' + counter);
    let countOfTraillingZeros = 5 - String(counter).length;
    console.log('number or trailing zeros = ' + countOfTraillingZeros)
    year = year.padEnd(String(year).length + String(countOfTraillingZeros).length, '0');
    console.log(year);
    console.log('year after padding to the end: ' + String(year))
    year = year + counter;
    console.log('year after concating the counter: ' + year)
    let uniquePlateBarcode = String(plateType) + "_" + String(year);
    counter = counter + 1;
    listOfBarcodes.push(uniquePlateBarcode);
    console.log('pushed ' + uniquePlateBarcode)
    barcodModel.updateOne({plateType: plateType},{$inc: { counter: 1 }});
    console.log('Updated the last index by one')  
  }
  //db.close();
  return listOfBarcodes;
  //});
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
