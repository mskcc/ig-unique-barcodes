var express = require('express');
const PlateBarcodesController = require('../controllers/PlateBarcodesController');
var router = express.Router();

router.get('/plateBarcode', PlateBarcodesController.generateUniqueBarcode);

module.exports = router;