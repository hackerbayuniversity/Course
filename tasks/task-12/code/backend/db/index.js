const Sequelize = require('sequelize');

let dbUrl = null;

if(process.env.NODE_ENV === 'test') dbUrl = 'postgres://utvdnzdb:hxLot3tUXkVkmG66z7uQlO05f-N1rjun@packy.db.elephantsql.com:5432/utvdnzdb';
else {
  dbUrl = 'postgres://student@postgres/web_monitor';
}

const sequelize = new Sequelize(dbUrl);

module.exports = sequelize;