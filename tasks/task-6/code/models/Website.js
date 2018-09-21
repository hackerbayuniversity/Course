module.exports = (sequelize, DataTypes) => {
  const Website = sequelize.define('Website', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
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