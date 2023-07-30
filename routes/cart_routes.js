const { Router } = require('express');
const controller = require('../controllers/cart_controllers'); 

const router = Router();

router.get(':/userId', checkAuthentication, controller.getCartByUserId);
router.post(':/userId', checkAuthentication, controller.createCart);
router.delete(':/userId', checkAuthentication, controller.deleteCart);

