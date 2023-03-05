const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Employee = require('./employee');

const Cost = sequelize.define('Cost', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    employee_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
});

Cost.belongsTo(Employee);
Employee.hasMany(Cost);

module.exports = Cost;