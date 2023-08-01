const { Router } = require('express');
const controller = require('../controllers/cart_controller'); 
const { checkAuthenticated } = require('../config/passport');

const router = Router();

// Get, create and delete cart (table: carts)
router.get(':/userId', checkAuthenticated, controller.getCartByUserId);
router.post(':/userId', checkAuthenticated, controller.createCart);
router.delete(':/userId', checkAuthenticated, controller.deleteCart);

// Add and remove products and update quantity (table: carts_products)
router.post(':/userId/:productId', checkAuthenticated, controller.addProductToCart);
router.delete(':/userId/productId', checkAuthenticated, controller.removeProductFromCart);
router.put(':/userId/:productId', checkAuthenticated, controller.updateProductQuantity);

// Checkout
router.post(':/userId/checkout', checkAuthenticated, controller.checkout);

module.exports = router;