const createCart = "INSERT INTO carts (user_id) VALUES ($1)";
const getCartByUserId = "SELECT * FROM carts WHERE user_id = $1";
//const getCartById = "SELECT * FROM carts WHERE id = $1"; needed?
const deleteCart = "DELETE FROM carts WHERE user_id = $1";

const addProductToCart = "INSERT INTO carts_products (cart_id, product_id, quantity) VALUES ($1, $2, $3)";
const removeProductFromCart = "DELETE FROM carts_products WHERE cart_id = $1 AND product_id = $2";
const updateProductQuantity = "UPDATE carts_products SET quantity = $1 WHERE cart_id = $2 AND product_id = $3";

module.exports = {
    createCart,
    getCartByUserId,
    //getCartById, 
    deleteCart,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
}