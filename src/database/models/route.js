module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
    name: DataTypes.STRING,
    originID: DataTypes.INTEGER,
    destinationID: DataTypes.INTEGER,
    busStops: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  Route.associate = (models) => {
    // associations can be defined here
    Route.hasMany(models.busStops, {
      foreignKey: 'id',
      as: 'busStopId',
      onDelete: 'CASCADE'
    });
  };
  return Route;
};
