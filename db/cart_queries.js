const createCart = "INSERT INTO carts (user_id) VALUES ($1)";
const getCartsByUserId = "SELECT * FROM carts WHERE user_id = $1";
const getCartById = "SELECT * FROM carts WHERE id = $1";
const deleteCart = "DELETE FROM carts WHERE id = $1";

const addProductToCart = "INSERT INTO carts_products VALUES ($1, $2, $3)";
