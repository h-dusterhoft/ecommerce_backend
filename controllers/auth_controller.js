const pool = require('../db/db');
const queries = require('../db/user_queries');
const bcrypt = require('bcrypt');

const registerUser = (req, res) => {
    let { username, password, first_name, last_name, email } = req.body;
    pool.query(queries.getUserByEmail, [email], async (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.status(400).send('Email taken.');
        } else {
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(password, salt);
            pool.query(queries.createUser, [username, hashedPassword, first_name, last_name, email], (error, results) => {
                if (error) throw error;
                res.status(201).send('User created!');
            });
        }
    });
};

module.exports = registerUser;