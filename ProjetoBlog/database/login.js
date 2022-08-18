const Sequelize = require('sequelize');
const connection = require('../database/database');

//Create model category
const UserModel = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false     
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

//Sincronizar o model com o relacionamento na tabela de dados
UserModel.sync({force: false})//Para criar a tabela caso não exista 

module.exports = UserModel