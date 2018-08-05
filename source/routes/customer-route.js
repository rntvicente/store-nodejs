const express = require('express');

const router = express.Router();
const validate = require('../services/validate-customer');
const controller = require('../controllers/customer-controller');

router.post('/', validate, controller.create);

module.exports = router;
