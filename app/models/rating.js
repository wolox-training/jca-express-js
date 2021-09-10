module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      score: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      weetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Weet',
          key: 'id'
        }
      }
    },
    {
      underscored: true,
      timestamps: true,
      tableName: 'ratings'
    }
  );

  Rating.associate = ({ User, Weet }) => {
    Rating.belongsTo(User, { foreignKey: 'userId' });
    Rating.belongsTo(Weet, { foreignKey: 'weetId' });
  };

  return Rating;
};
