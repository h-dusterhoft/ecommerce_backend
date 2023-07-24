const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1"; 
const getUserByUsername = "SELECT * FROM users WHERE username = $1";
// createUser - POST /users
// updateUser - PUT /users/:id
// deleteUser - DELETE /users/:id

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername
};