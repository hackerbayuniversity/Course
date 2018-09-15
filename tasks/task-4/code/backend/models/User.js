const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = require('../db');

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING
  //   validate: {
  //     isEmail: {
  //       msg: 'Email address must be valid.'
  //               }
  //   }
  },
  password: {
    type: Sequelize.STRING
  }
});

User.beforeCreate((user, options) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(user.password, salt);
  return user.password = hash;
})

module.exports = User;