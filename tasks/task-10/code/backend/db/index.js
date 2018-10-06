const Sequelize = require('sequelize');

let dbUrl = null;

if(process.env.NODE_ENV === 'test') dbUrl = 'postgres://utvdnzdb:hxLot3tUXkVkmG66z7uQlO05f-N1rjun@packy.db.elephantsql.com:5432/utvdnzdb';
else {
  dbUrl = 'postgres://ivan:123456@localhost:5432/tutorial_web_monitor';
}

const sequelize = new Sequelize(dbUrl, {
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