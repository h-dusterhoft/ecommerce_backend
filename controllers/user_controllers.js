const pool = require('../db/db');
const queries = require('../db/user_queries');

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getUserByUsername = (req, res) => {
    const username = req.params.username;
    pool.query(queries.getUserByUsername, [username], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getUserByEmail = (req, res) => {
    const email = req.params.email;
    pool.query(queries.getUserByEmail, [email], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const createUser = (req, res) => {
    const {username, password, first_name, last_name, email} = request.body;
    pool.query(queries.createUser, [username, password, first_name, last_name, email], (error, results) => {
        if (error) throw error;
        res.status(201).send('User created!');
    });
};

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    createUser
};