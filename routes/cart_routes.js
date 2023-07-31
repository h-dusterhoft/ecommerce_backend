const { Router } = require('express');
const controller = require('../controllers/cart_controller'); 
const { checkAuthenticated } = require('../config/passport');

const router = Router();

// Get, create and delete cart (table: carts)
router.get(':/userId', checkAuthenticated, controller.getCartByUserId);
router.post(':/userId', checkAuthenticated, controller.createCart);
router.delete(':/userId', checkAuthenticated, controller.deleteCart);

// Add and remove products and update quantity (table: carts_products)
// should the route be /:userId/:productId ?
router.post(':/userId', checkAuthenticated, controller.addProductToCart);
router.delete(':/userId', checkAuthenticated, controller.removeProductFromCart);
router.put(':/userId', checkAuthenticated, controller.updateProductQuantity);

module.exports = router;