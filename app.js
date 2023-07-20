require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/product_routes');
const userRoutes = require('./routes/user_routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000; // ADD process.env.PORT later

app.use(cors());

app.use(express.json());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to my e-commerce site!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});