const pool = require('../db/db');
const queries = require('../db/cart_queries');
const orderQueries = require('../db/order_queries');

const getCartByUserId = (req, res) => {
    const userId = parseInt(req.params.userId);
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
    const userId = parseInt(req.params.userId);
    pool.query(queries.createCart, [userId], (error, results) => {
        if (error) throw error;
        res.status(201).send('Cart created!');
    });
};

const deleteCart = (req, res) => {
    const userId = parseInt(req.params.userId);
    pool.query(queries.deleteCart, [userId], (error, results) => {
        if (error) throw error;
        res.status(200).send(`Cart deleted with ID: ${id}`);
    });
};

const addProductToCart = (req, res) => {
    const cartId = parseInt(req.body.cartId);
    const productId = parseInt(req.params.productId);
    const quantity = parseInt(req.body.quantity);
    pool.query(queries.addProductToCart, [cartId, productId, quantity], (req, res) => {
        if (error) throw error;
        pool.query(queries.updateTotalProductCost, [productId], (req, res) => {
            if (error) throw error;
            res.status(201).send('Product added!');
        });
    });
};

const removeProductFromCart = (req, res) => {
    const cartId = parseInt(req.body.cartId);
    const productId = parseInt(req.params.productId);
    pool.query(queries.addProductToCart, [cartId, productId], (req, res) => {
        if (error) throw error;
        pool.query(queries.updateTotalProductCost, [productId], (req, res) => {
            if (error) throw error;
            res.status(200).send(`Product deleted with ID: ${productId}`);
        });
    });
};

const updateProductQuantity = (req, res) => {
    const cartId = parseInt(req.body.cartId);
    const productId = parseInt(req.params.productId);
    const quantity = parseInt(req.body.quantity);
    pool.query(queries.addProductToCart, [quantity, cartId, productId], (req, res) => {
        if (error) throw error;
        pool.query(queries.updateTotalProductCost, [productId], (req, res) => {
            if (error) throw error;
            res.status(200).send(`Product quantity updated with ID: ${productId}`);
        });
    });
};

const checkout = (req, res) => {
    const userId = req.params.userId;
    const cartId = req.body.cartId;
    pool.query(queries.getCartByUserId, [userId], (error, results) => {
        if (error) throw error;
        if (results.rows.length === 0) {
            res.status(400).send('Cart empty');
        } else {
            const order = results.rows;
            pool.query(queries.calculateTotal, [cartId], (error, results) => {
                if (error) throw error;
                const total_price = results.rows[0].total_price;
                const status = "payment received";
                pool.query(orderQueries.createOrder, [userId, status, total_price], (error, results) => {
                    if (error) throw error;
                    const order_id = results.rows[0].id;
                    order.forEach(product => {
                        pool.query(orderQueries.createOrderProducts, [order_id, product.product_id, product.quantity, product.total_product_price], (error, results) => {
                            if (error) throw error;
                        })
                    });
                    pool.query(queries.deleteCart, [userId], (error, results) => {
                        if (error) throw error;
                    });
                    res.status(200).send('Order submitted!');
                })
            }); 
        }
    });
};

module.exports = {
    getCartByUserId,
    createCart,
    deleteCart,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    checkout
};