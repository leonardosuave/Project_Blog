const express = require('express');
const route = express.Router();
const pageController = require('../controllers/pageController')

const categoriesController = require('../controllers/categoriesController');
const { loginRequired } = require('../middlewares/middleware');

//Page with categories
route.get('/admin/categories', loginRequired, categoriesController.index)

//Create a new category
route.get('/admin/categories/new', loginRequired, categoriesController.indexCreate);
route.post('/categories/save', loginRequired, categoriesController.create);

//delete and edit categories
route.get('/categories/delete/:id', loginRequired, categoriesController.delete)
route.get('/categories/edit/:id', loginRequired, categoriesController.loadCategory)
route.post('/categories/update/:id', loginRequired, categoriesController.updateCategory)

//access category by slug in navbar itens
route.get('/category/:slug', loginRequired, categoriesController.slugAccess)

//TESTE DE PAG DE ARTIGOS POR CATEGORIA
route.get('/articles/:category/page/:num', loginRequired, pageController.artToCategory)


module.exports = route;