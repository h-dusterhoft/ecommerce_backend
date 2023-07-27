const { Router } = require('express');
const controller = require('../controllers/user_controllers');

const router = Router();

router.get('/:id', controller.getUserById);

  
router.get('/profile', (req, res) => {
    res.render('profile.ejs', { user: req.user });
  });

module.exports = router;
