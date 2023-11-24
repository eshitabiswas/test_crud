const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const UserModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
},
    {
        timestamps: false, // This line removes createdAt and updatedAt
    },
    {
        tableName: 'users'
    });

module.exports = UserModel;
