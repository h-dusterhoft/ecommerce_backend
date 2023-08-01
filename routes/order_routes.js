const { Router } = require('express');
const controller = require('../controllers/order_controller'); 
const { checkAuthenticated } = require('../config/passport');

const router = Router();

router.get('/:userId', checkAuthenticated, controller.getOrders);
router.get('/:userId/:orderId', checkAuthenticated, controller.getOrderById);
router.get('/:userId/:orderId/products', checkAuthenticated, controller.getOrderProducts);

module.exports = router;