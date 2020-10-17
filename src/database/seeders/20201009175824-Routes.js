module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Routes',
    [
      {
        name: 'Remera - Town',
        originID: 1,
        destinationID: 2,
        busStops: [1, 2],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface,) => queryInterface.bulkDelete('Routes', null, {}),
};
