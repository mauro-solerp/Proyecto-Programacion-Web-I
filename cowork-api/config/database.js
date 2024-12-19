const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cowork_api', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;