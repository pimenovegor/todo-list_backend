const Sequelize = require("sequelize");
const { sequelize } = require("..");
const ToDo = require("./ToDo.model.");
const Token = require("./Token.model.");

class User extends Sequelize.Model {}

User.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    login: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
      defaultValue: "Name",
    },
    info: {
      type: Sequelize.STRING,
    }
  },
  { sequelize: sequelize, underscored: true, modelName: "user" }
);

User.hasMany(Token);
Token.belongsTo(User, {
  foreignKey: "userId",
});
User.hasMany(ToDo);
ToDo.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = User;
