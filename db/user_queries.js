const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1"; 
const getUserByUsername = "SELECT * FROM users WHERE username = $1";
const getUserByEmail = "SELECT * FROM users WHERE email = $1";
const createUser = "INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)";
const updateUser = "UPDATE users SET username = $1, password = $2, first_name = $3, last_name = $4, email = $5 WHERE id = $6";
const deleteUser = "DELETE FROM users WHERE id = $1";

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};