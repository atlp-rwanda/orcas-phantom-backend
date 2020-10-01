module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'busStops',
    [
      {
        busStopName: Kinamba,
        coordinate: DataTypes.STRING,
        sector: gisozi,
        district: gasabo,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        busStopName: kacyiru,
        coordinate: DataTypes.STRING,
        sector: gisozi,
        district: gasabo,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface,) => queryInterface.bulkDelete('busStop', null, {}),
};

// database/seeds/xxxx-busStops.js
