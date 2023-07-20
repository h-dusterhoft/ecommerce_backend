const { Router } = require('express');
const controller = require('../controllers/product_controllers');

const router = Router();

router.get('/', controller.getProducts);

module.exports = router;