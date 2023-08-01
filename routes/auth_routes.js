const { Router } = require('express');
const passport = require('passport');
const controller = require('../controllers/auth_controller');

const router = Router();

router.get('/register', (req, res) => {
    res.render('register.ejs');
  });

router.post('/register', controller.registerUser); //throwing error

router.get('/login', (req, res) => {
    res.render('login.ejs');
  });

router.post('/login', passport.authenticate('local'), (req, res) => {
    const user = req.user;
    console.log(user);
     res.json({message: `${user.first_name} is logged in`});
  });

router.get('/logout', (req, res) => {
    req.logout();
    res.json({message: 'User logged out'});
    res.redirect('/');
  }); 

module.exports = router;