require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect=pg-simple')(session);
const pool = require('../db/db');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { loadPassport } = require('./config/passport');

const app = express();
const PORT = process.env.PORT || 3000; // ADD process.env.PORT later

app.set('view-engine', 'ejs');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true
    }),
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
loadPassport(passport);

const productRoutes = require('./routes/product_routes');
const userRoutes = require('./routes/user_routes');
const authRoutes = require('./routes/auth_routes');
const cartRoutes = require('./routes/cart_routes');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});