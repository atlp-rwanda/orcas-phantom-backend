module.exports = (sequelize, DataTypes) => {
  const Bus = sequelize.define('Bus', {
    bus_status: DataTypes.STRING,
    bus_plate: DataTypes.STRING,
    routId: DataTypes.INTEGER,
    currentLocation: DataTypes.STRING
  }, {});
  return Bus;
};
