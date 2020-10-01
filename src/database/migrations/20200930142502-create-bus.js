module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Buses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bus_status: {
        type: Sequelize.STRING
      },
      routId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      currentLocation: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Buses');
  }
};
