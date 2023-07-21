require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/product_routes');
const userRoutes = require('./routes/user_routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
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

app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});