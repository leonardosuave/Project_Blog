const Sequelize = require('sequelize');
const connection = require('../database/database');

//Create model category
const CategoryModel = connection.define('categories', {
    title: {
        type: Sequelize.STRING  ,
        allowNull: false     
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Sincronizar o model com o relacionamento na tabela de dados
CategoryModel.sync({force: false})//Para criar a tabela caso não exista 

module.exports = CategoryModel