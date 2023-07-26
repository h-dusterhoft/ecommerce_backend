const pool = require('../db/db');
const bcrypt = require('bcrypt');
const passport = require(passport);
const dbUser = require('./controllers/user_controllers');const passport = require('passport');

const registerUser = async (req, res) => {
    let data = req.body;
    let emailCheck = await dbUser.getUserByEmail(data.email)
    if (emailCheck) {
        return res.status(400).send('Email taken.');
    } else {
        let salt = await bcrypt.getSalt(10);
        let hashedPassword = await bcrypt.hash(data.password, salt);
        data.password = hashedPassword;
        await dbUser.createUser;
    };
};

module.exports = {
    registerUser,
    
}