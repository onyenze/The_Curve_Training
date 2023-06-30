const {
    createUser,
    allUsers,
    oneUser,
    updateUser,
    deleteUser
} = require('../controllers/userController')
const express = require('express');
const route = express.Router();

route.post('/users', createUser)
route.get('/users', allUsers)
route.get('/users/:id', oneUser)
route.put('/users/:id', updateUser)
route.delete('/users/:id', deleteUser)

module.exports = route
