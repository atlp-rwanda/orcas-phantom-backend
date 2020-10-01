module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Buses',
    [
      {
        bus_status: 'Active',
        routId: 2,
        currentLocation: 'Remera',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],

    {}
  ),
  // eslint-disable-next-line no-return-await
  down: (queryInterface) => queryInterface.bulkDelete('Buses', null, {})
};
