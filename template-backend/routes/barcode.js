var express = require('express');
const PlateBarcodesController = require('../controllers/PlateBarcodesController');
var router = express.Router();

router.post('/getNumOfBarcodes', PlateBarcodesController.getNumOfBarcodes);
router.get('/plateBarcode', PlateBarcodesController.generateUniqueBarcode);
router.get('/cat', PlateBarcodesController.getCatFact);

module.exports = router;