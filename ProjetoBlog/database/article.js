const Sequelize = require('sequelize');
const connection = require('../database/database')
const CategoryModel = require('./category'); //To relate the tables.

//Create model article
const ArticleModel = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNul: false
    }, slug: {
        type: Sequelize.STRING,
        allowNul: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNul: false
    }
});

CategoryModel.hasMany(ArticleModel) //uma categoria tem muitos artigos (1-p-n)
ArticleModel.belongsTo(CategoryModel) //Um artigo pertense a uma categoria (1-p-1) -> cria CategoryId, referente ao singular do nome da tab categories e referencia o ID dessa category.

//Sincronizar o model com o relacionamento na tabela de dados
ArticleModel.sync({force: false}) //Para criar a tabela caso não exista

module.exports = ArticleModel