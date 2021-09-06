module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ratings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      weet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'weets',
          key: 'id'
        }
      },
      rating: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });

    return queryInterface.addConstraint('ratings', {
      fields: ['user_id', 'weet_id'],
      type: 'unique'
    });
  },
  down: queryInterface => queryInterface.dropTable('ratings')
};
