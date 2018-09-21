const Sequelize = require('sequelize');
const sequelize = new Sequelize('tutorial_web_monitor', 'ivan', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;