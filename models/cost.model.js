import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize.js';

const Cost = sequelize.define('Cost', {
    id: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        allowNull: true
    }
});


export default Cost;