const { Router } = require('express');
const controller = require('../controllers/user_controllers');
const { checkAuthenticated } = require('../config/passport');

const router = Router();

router.get('/:id', checkAuthenticated, controller.getUserById);
router.get('/profile', checkAuthenticated, controller.profilePage); //needed?
router.put('/:id', checkAuthenticated, controller.updateUser);
router.delete('/:id', checkAuthenticated, controller.deleteUser);

module.exports = router;
