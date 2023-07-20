const pool = require('../db/db');
const queries = require('../db/product_queries');

const getProducts = (req, res) => {
    pool.query(queries.getProducts, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getProducts,
};