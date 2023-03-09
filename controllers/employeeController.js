import Joi from 'joi';
import Employee from '../models/employee.js';

export default class EmployeeController {

    static async getEmployees(req, res) {

        try {
            const employees = await Employee.findAll();
            
            if(!employees.length) {
                return res.json({ 
                    success: true,
                    message: 'No employee has been recorded.',
                });
            }
            res.json({
                success: true,
                body: employees
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Server error',
            });
        }

    }
  
    static async getEmployeeById(req , res){

        try {
            const employee = await Employee.findByPk(req.params.id);
            if (!employee) {
                return res.status(404).json({
                    success: false,
                    message: 'Employee not found.'
                });
            }
            res.json({
                success: true,
                body: employee
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Server error',
            });
        }

    }
  
    static async addEmployee(req, res) {

        // Define a schema for validating employee data
        const employeeSchema = Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
        });

        // Validate employee data in the request body
        const { error, value } = employeeSchema.validate(req.body);

        // Check if there are any validation errors
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        try {
            const { first_name, last_name, email } = value;
            const employee = await Employee.create({ first_name, last_name, email });
            res.status(201).json({
                success: true,
                message: 'Employee has been created.',
                body: employee,
            });
        } catch (error) {
            console.error(error);
            if (error.name === 'SequelizeUniqueConstraintError') {
              res.status(400).json({
                success: false,
                message: 'Email already exists.',
              });
            } else {
              res.status(500).json({
                success: false,
                message: 'Server error',
              });
            }
        }

    }
  
    static async updateEmployee(req, res) {

        // Define a schema for validating employee data
        const employeeSchema = Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
        });

        // Validate employee data in the request body
        const { error, value } = employeeSchema.validate(req.body);

        // Check if there are any validation errors
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        // If there are no validation errors, update the employee
        try {
        const { first_name, last_name, email } = value;

        // Check if the employee with the given ID exists
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found.',
            });
        }

        employee.first_name = first_name;
        employee.last_name = last_name;
        employee.email = email;

        await employee.save();
            res.json({
                success: true,
                body: employee,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Server error',
            });
        }

    }
  
    static async deleteEmployee(req, res) {

        try {
            const employee = await Employee.findByPk(req.params.id);
            if (!employee) {
                return res.status(404).json({
                    success: false,
                    message: 'Employee not found.'
                });
            }
            await employee.destroy();
            res.json({
                success: true,
                message: 'Employee has been deleted.',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Server error',
            });
        }

    }

}