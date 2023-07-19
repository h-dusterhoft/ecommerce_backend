const { Router } = require('express');
const query = require('../db/product_queries');

const router = Router();

router.get('/', query.getProducts);

module.exports = router;