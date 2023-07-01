import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize.js';

import Cost from './cost.model.js';

const Employee = sequelize.define('Employee', {
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

// Define the relationship between Employee and Cost

Employee.hasMany(Cost, { foreignKey: 'employee_id' });
Cost.belongsTo(Employee, { foreignKey: 'employee_id' });


export default Employee;