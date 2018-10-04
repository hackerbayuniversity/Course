const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.associate = function (models) {
    models.User.hasMany(models.Website);
  };

  User.beforeCreate((user, options) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(user.password, salt);
  return user.password = hash;
})

  return User;
};