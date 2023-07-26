const pool = require('../db/db');
const queries = require('../db/user_queries');
const bcrypt = require('bcrypt');
const passport = require(passport);

const registerUser = (req, res) => {
    const {username, password, first_name, last_name, email} = req.body;
    pool.query(queries.getUserByEmail, [email], async (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            return res.status(400).send('Email taken.');
        } else {
            let salt = await bcrypt.getSalt(10);
            let hashedPassword = await bcrypt.hash(data.password, salt);
            pool.query(queries.createUser, [username, password, first_name, last_name, email], (error, results) => {
                if (error) throw error;
                res.status(201).send('User created!');
            });
        }
    });
};

module.exports = {
    registerUser,
}