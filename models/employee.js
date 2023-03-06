import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize.js';
// import Cost from './cost.js';

const Employee = sequelize.define('Employees', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  }
});

// Define the relationship between Employee and Transaction
// Employee.hasMany(Cost);

export default Employee;