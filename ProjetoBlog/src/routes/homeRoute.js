const express = require('express');
const route = express.Router();

//Import Controllers
const homeController = require('../controllers/homeController')

//Routers
route.get('/', homeController.index)

module.exports = route;