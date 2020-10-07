module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
    name: DataTypes.STRING,
    originID: DataTypes.INTEGER,
    destinationID: DataTypes.INTEGER,
    busStops: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  return Route;
};
