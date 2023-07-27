const pool = require('../db/db');
const queries = require('../db/user_queries');

const profilePage = (req, res) => {
    res.render('profile.ejs', { user: req.user });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const updateUser = (req, res) => {
    const {username, password, first_name, last_name, email} = req.body;
    const id = parseInt(req.params.id);
    pool.query(queries.updateUser, [username, password, first_name, last_name, email, id], async (error, results) => {
        if (error) throw error;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            password = hashedPassword;
        };
        res.status(200).send(`User modified with ID: ${id}`);
    });
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.deleteUser, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send(`User deleted with ID: ${id}`);
    });
};

// Any need to get all users?

/* const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}; */

// Used getUserByUsername in passport.js

/* const getUserByUsername = (req, res) => {
    const username = req.params.username;
    pool.query(queries.getUserByUsername, [username], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}; */

// Used getUserByEmail in the auth_controller

/* const getUserByEmail = (req, res) => {
    const email = req.params.email;
    pool.query(queries.getUserByEmail, [email], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}; */

// Used createUser in auth_controller

/* const createUser = (req, res) => {
    const {username, password, first_name, last_name, email} = request.body;
    pool.query(queries.createUser, [username, password, first_name, last_name, email], (error, results) => {
        if (error) throw error;
        res.status(201).send('User created!');
    });
}; */

module.exports = {
    getUserById,
    profilePage,
    updateUser,
    deleteUser
    // getUsers,
    // getUserByUsername,
    // getUserByEmail,
    // createUser,
};