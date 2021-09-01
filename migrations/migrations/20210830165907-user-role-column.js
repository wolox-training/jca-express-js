const { USER } = require('../../app/constants/roles');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: USER
    }),
  down: queryInterface => queryInterface.removeColumn('users', 'role')
};
