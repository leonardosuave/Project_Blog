require('dotenv').config(); //To hide the password when up the file to repository
const Sequelize = require('sequelize')

//connection DB
const connection = new Sequelize('blog', 'root', process.env.CONNECTIONSTRING, {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00',
    logging: false
});

module.exports = connection;