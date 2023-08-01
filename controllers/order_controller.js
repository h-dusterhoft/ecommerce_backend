const pool = require('../db/db');
const queries = require('../db/order_queries');

const getOrders = (req, res) => {
    pool.query(queries.getOrders, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getOrderById = (req, res) => {
    const orderId = req.params.id;
    pool.query(queries.getOrderById, [orderId], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getOrderProducts = (req, res) => {
    const orderId = req.params.order_id;
    pool.query(queries.getOrderProducts, [orderId], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

module.exports = {
    getOrders,
    getOrderById,
    getOrderProducts
}