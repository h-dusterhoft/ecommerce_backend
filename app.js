require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/product_routes');
const userRoutes = require('./routes/user_routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const app = express();
const PORT = process.env.PORT || 3000; // ADD process.env.PORT later

app.set('view-engine', 'ejs');

app.use(cors());

app.use(express.json());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize()); 
app.use(passport.session()); 

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

const dbUser = require('./controllers/user_controllers') //authenticateUser

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await dbUser.authenticateUser({ username, password }); //create
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  }
));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('profile');
  });

app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.post('/register', userRoutes.createUser); //create

app.get('/profile', (req, res) => {
  res.render('profile.ejs', { user: req.user });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});