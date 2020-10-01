module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'busStops',
    [
      {
        busStopName: 'Kinamba',
        coordinate: '1234566.456789',
        sector: 'gisozi',
        district: 'gasabo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        busStopName: 'kacyiru',
        coordinate: '1234567.678900',
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
