const express = require('express');

const router = express.Router();
const controller = require('../controllers/product-controller');
const validate = require('../services/validate-products');

router.get('/', controller.get);
router.get('/async/', controller.getAsync);
router.get('/:slug', controller.getBySlug);
router.get('/tags/:tag', controller.getByTags);
router.get('/admin/:id', controller.getById);
router.post('/', validate, controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.remove);

module.exports = router;
