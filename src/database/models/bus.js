module.exports = (sequelize, DataTypes) => {
  const Bus = sequelize.define('Bus', {
    bus_status: DataTypes.STRING,
    routId: DataTypes.INTEGER,
    currentLocation: DataTypes.STRING
  }, {});
  Bus.associate = () => {
    // associations can be defined here
    // Bus.hasMany(models.Route, {
    //   foreignKey: 'routId',
    //   as: 'routes',
    //   onDelete: 'CASCADE',
    // });
  };
  return Bus;
};
