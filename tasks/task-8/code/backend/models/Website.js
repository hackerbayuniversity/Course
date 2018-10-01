module.exports = (sequelize, DataTypes) => {
  const Website = sequelize.define('Website', {
    name: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
           msg: "URL is not valid"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'online'
    }
  });

  Website.associate = function (models) {
    models.Website.belongsTo(models.User, {
    							foreignKey: { allowNull: false },
    							onDelete: "CASCADE"
    							});
  };

  return Website;
};