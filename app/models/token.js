module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'Token',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'user-tokens'
    }
  );

  Token.associate = ({ User }) => {
    Token.belongsTo(User, { foreignKey: 'userId' });
  };

  return Token;
};
