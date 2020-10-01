module.exports = (sequelize, DataTypes) => {
  const busStop = sequelize.define('busStop', {
    busStopName: DataTypes.STRING,
    coordinate: DataTypes.STRING,
    sector: DataTypes.STRING,
    district: DataTypes.STRING
  }, {});
  busStop.associate = () => {
  };
  return busStop;
};
