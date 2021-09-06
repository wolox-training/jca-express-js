module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      rating: {
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
    Rating.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user'
    });

    Rating.belongsTo(Weet, {
      foreignKey: 'weetId',
      as: 'weet'
    });
  };

  return Rating;
};
