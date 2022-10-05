var express = require('express');
const PlateBarcodesController = require('../controllers/PlateBarcodesController');
var router = express.Router();

router.get('/', PlateBarcodesController.generateUniquePlateBarcode);
router.get('/cat', PlateBarcodesController.getCatFact);

module.exports = router;