const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1"; 
const getUserByUsername = "SELECT * FROM users WHERE username = $1";
const getUserByEmail = "SELECT * FROM users WHERE email = $1";
const createUser = "INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)";
// updateUser - PUT /users/:id
// deleteUser - DELETE /users/:id

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    createUser
};