const express = require('express');
const route = express.Router();

const loginController = require('../controllers/loginController')

//Tela inicial de login/register
route.get('/admin/users/login', loginController.index)

//Para registrar e fazer login
route.post('/users/register', loginController.register)
route.post('/login/authenticate',loginController.login)

//logout
route.get('/login/logout', loginController.logout)

module.exports = route