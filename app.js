const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // ADD process.env.PORT later
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
    res.send('Welcome to my e-commerce site!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});