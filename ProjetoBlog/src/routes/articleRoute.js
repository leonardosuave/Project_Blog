const express = require('express');
const route = express.Router();
const articlesController = require('../controllers/articlesController')
const pageController = require('../controllers/pageController');
const { loginRequired } = require('../middlewares/middleware');

//Home page articles
route.get('/admin/articles', loginRequired, articlesController.index)

//Create articles
route.get('/admin/articles/new', loginRequired, articlesController.indexCreate)
route.post('/articles/save', loginRequired, articlesController.create)

//Delete and update articles
route.get('/article/delete/:id', loginRequired, articlesController.delete)
route.get('/admin/article/edit/:id', loginRequired, articlesController.loadArticle)
route.post('/admin/article/update/:id', loginRequired, articlesController.updateArticle)

//Acess article by homepage
route.get('/:slug', loginRequired, articlesController.slugAccess)

//Page to access articles
route.get('/article/page/:num', loginRequired, pageController.index)

module.exports = route