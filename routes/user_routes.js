const { Router } = require('express');
const controller = require('../controllers/user_controllers');

const router = Router();

router.get('/', controller.getUsers);
router.get('/:id', controller.getUserById);

module.exports = router;
