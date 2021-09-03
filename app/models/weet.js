module.exports = (sequelize, DataTypes) => {
  const Weet = sequelize.define(
    'Weet',
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      underscored: true,
      timestamps: true,
      tableName: 'weets'
    }
  );

  Weet.associate = ({ User }) => {
    Weet.belongsTo(User, { foreignKey: 'userId' });
  };

  return Weet;
};
