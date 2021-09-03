module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('weets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    }),
  down: queryInterface => queryInterface.dropTable('weets')
};
