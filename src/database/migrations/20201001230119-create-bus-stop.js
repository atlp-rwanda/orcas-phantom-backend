module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('busStops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      busStopName: {
        type: Sequelize.STRING
      },
      coordinate: {
        type: Sequelize.STRING
      },
      sector: {
        type: Sequelize.STRING
      },
      district: {
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
    await queryInterface.dropTable('busStops');
  }
};
