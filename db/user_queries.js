const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1"; //change to exclude password
// createUser - POST /users
// updateUser - PUT /users/:id
// deleteUser - DELETE /users/:id

module.exports = {
    getUsers,
    getUserById
};