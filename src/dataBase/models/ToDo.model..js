const Sequelize = require('sequelize');
const { sequelize } = require('..');

class ToDo extends Sequelize.Model {}

ToDo.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
            defaultValue: "Description"
        },
        isDone: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isFavourite:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        priority:{
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
    },
    { sequelize: sequelize,underscored:true, modelName: 'todo' }
);

module.exports = ToDo