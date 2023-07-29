const pool = require('../db/db');
const queries = require('../db/cart_queries');

const getCartByUserId = (req, res) => {
    const user_id = req.params.user_id;
    pool.query(queries.getCartByUserId, [user_id], (error, results) => {
        if (error) throw error;
        if (results.rows.length === 0) {
            res.status(400).send('Cart empty');
        } else {
            res.status(200).send(results.rows);
        }
    });
};

module.exports = {
    getCartByUserId,
    
}