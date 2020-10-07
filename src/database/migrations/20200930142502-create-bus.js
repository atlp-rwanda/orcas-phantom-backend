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
      bus_plate: {
        type: Sequelize.STRING,
        unique: true,
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('Buses');
  }
};
