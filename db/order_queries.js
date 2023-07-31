const createOrder = "INSERT INTO orders (user_id, status, time, total_price) VALUES ($1, $2, time_stamp, $3)";
const createOrderProducts = "INSERT INTO orders_products (order_id, product_id, quantity, total_product_price) VALUES ($1, $2, $3, $4)";

const getOrders = "SELECT * FROM orders";
const getOrderById = "SELECT * FROM orders WHERE id = $1";
const getOrderProducts = "SELECT * FROM orders_products WHERE order_id = $1";

module.exports = {
    createOrder,
    createOrderProducts,
    getOrders,
    getOrderById,
    getOrderProducts,
};
