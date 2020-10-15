module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      originID: {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'busStops',
          key: 'id'
        }
      },
      destinationID: {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'busStops',
          key: 'id'
        }
      },
      busStops: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
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
    await queryInterface.dropTable('Routes');
  }
};
