module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'busStops',
    [
      {
        busStopName: 'Kinamba',
        coordinate: '-84.518641,39.134270',
        sector: 'gisozi',
        district: 'gasabo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        busStopName: 'kacyiru',
        coordinate: '-84.512023,39.102779',
        sector: 'gisozi',
        district: 'gasabo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface,) => queryInterface.bulkDelete('busStops', null, {}),
};

// database/seeds/xxxx-busStops.js
