module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('user-tokens', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    }),

  down: queryInterface => queryInterface.dropTable('user-tokens')
};
