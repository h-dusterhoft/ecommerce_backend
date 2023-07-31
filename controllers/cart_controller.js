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
    const productId = parseInt(req.body.product_id);
    const quantity = parseInt(req.body.quantity);
    pool.query(queries.addProductToCart, [cartId, productId, quantity], (req, res) => {
        if (error) throw error;
        res.status(201).send('Product added!');
    });
};

const removeProductFromCart = (req, res) => {
    const cartId = parseInt(req.body.cart_id);
    const productId = parseInt(req.body.product_id);
    pool.query(queries.addProductToCart, [cartId, productId], (req, res) => {
        if (error) throw error;
        res.status(20).send(`Product deleted with ID: ${productId}`);
    });
};

const updateProductQuantity = (req, res) => {
    const cartId = parseInt(req.body.cart_id);
    const productId = parseInt(req.body.product_id);
    const quantity = parseInt(req.body.quantity);
    pool.query(queries.addProductToCart, [quantity, cartId, productId], (req, res) => {
        if (error) throw error;
        res.status(20).send(`Product quantity updated with ID: ${productId}`);
    });
};

const checkout = (req, res) => {
    
}

module.exports = {
    getCartByUserId,
    createCart,
    deleteCart,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity
}