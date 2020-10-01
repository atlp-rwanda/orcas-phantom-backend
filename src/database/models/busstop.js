module.exports = (sequelize, DataTypes) => {
  const busStops = sequelize.define('busStops', {
    busStopName: DataTypes.STRING,
    coordinate: DataTypes.STRING,
    sector: DataTypes.STRING,
    district: DataTypes.STRING
  }, {});
  return busStops;
};
