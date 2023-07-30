const pool = require('../db/db');
const queries = require('../db/cart_queries');

const getCartByUserId = (req, res) => {
    const userId = parseInt(req.params.user_id);
    pool.query(queries.getCartByUserId, [userId], (error, results) => {
        if (error) throw error;
        if (results.rows.length === 0) {
            res.status(400).send('Cart empty');
        } else {
            res.status(200).send(results.rows);
        }
    });
};

const createCart = (req, res) => {
    const userId = parseInt(req.params.user_id);
    pool.query(queries.createCart, [userId], (error, results) => {
        if (error) throw error;
        res.status(201).send('Cart created!');
    });
};

const deleteCart = (req, res) => {
    const userId = parseInt(req.params.user_id);
    pool.query(queries.deleteCart, [userId], (error, results) => {
        if (error) throw error;
        res.status(200).send(`Cart deleted with ID: ${id}`);
    });
};

const addProductToCart = (req, res) => {
    const cartId = parseInt(req.body.cart_id);
    const productId = parseInt(req.params.product_id);
    const quantity = parseInt(req.body.quantity);
    pool.query(queries.)
}

module.exports = {
    getCartByUserId,
    createCart,
    deleteCart,

}