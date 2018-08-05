const express = require('express');

const router = express.Router();
const controller = require('../controllers/order-controller');
const validate = require('../services/validate-orders');

router.post('/', validate, controller.create);
router.get('/', controller.getAllAsync);

module.exports = router;
