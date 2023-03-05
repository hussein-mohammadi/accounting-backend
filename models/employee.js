const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Cost = require('./cost');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

// Define the relationship between Employee and Transaction
Employee.hasMany(Cost);
Cost.belongsTo(Employee);

module.exports = Employee;