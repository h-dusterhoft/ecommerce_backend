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

// change to getUserByUsername

module.exports = {
    getUsers,
    getUserById,
};