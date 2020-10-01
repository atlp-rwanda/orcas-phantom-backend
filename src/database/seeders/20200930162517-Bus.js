module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Buses',
    {
      bus_status: 'Active',
      bus_plate: 'RAD 345 C',
      routId: 2,
      currentLocation: { type: 'Point', coordinates: [39.807222, -76.984722] },
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {}
  ),
  // eslint-disable-next-line no-return-await
  down: (queryInterface) => queryInterface.bulkDelete('Buses', null, {})
};
