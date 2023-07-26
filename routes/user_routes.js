const { Router } = require('express');
const controller = require('../controllers/user_controllers');

const router = Router();

router.get('/', controller.getUsers);
router.get('/:id', controller.getUserById);

// FIX BELOW

router.get('/login', (req, res) => {
    res.render('login.ejs');
  });
  
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('profile');
    });
  
router.get('/register', (req, res) => {
    res.render('register.ejs');
  });
  
router.post('/register', userRoutes.createUser); //create
  
router.get('/profile', (req, res) => {
    res.render('profile.ejs', { user: req.user });
  });
  
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  }); 

module.exports = router;
