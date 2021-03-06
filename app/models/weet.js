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
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        }
      }
    },
    {
      underscored: true,
      timestamps: true,
      tableName: 'weets'
    }
  );

  Weet.associate = ({ User, Rating }) => {
    Weet.belongsTo(User, { foreignKey: 'userId' });
    Weet.hasMany(Rating, { foreignKey: 'weetId' });
  };

  return Weet;
};
