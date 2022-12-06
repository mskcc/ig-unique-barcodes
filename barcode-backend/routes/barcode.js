var express = require('express');
const PlateBarcodesController = require('../controllers/PlateBarcodesController');
var router = express.Router();

router.get('/plateBarcode', PlateBarcodesController.generateUniqueBarcode);
router.get('/exportExcel', PlateBarcodesController.exportExcel);

module.exports = router;