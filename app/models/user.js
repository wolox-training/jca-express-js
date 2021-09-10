const { USER } = require('../constants/roles');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: USER
      },
      position: {
        type: DataTypes.ENUM,
        values: ['Developer', 'Lead', 'TL', 'EM', 'HEAD', 'CEO'],
        defaultValue: 'Developer'
      }
    },
    {
      timestamps: false,
      tableName: 'users'
    }
  );

  User.associate = ({ Weet, Rating }) => {
    User.hasMany(Weet, { foreignKey: 'userId' });
    User.hasMany(Rating, { foreignKey: 'userId' });
  };

  return User;
};
