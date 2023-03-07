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

        try {
            const { title, date, amount, description } = req.body;

            const employee = await Employee.create({ title, date, amount, description });
            res.status(201).json({
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
  
    static async updateEmployee(req, res) {

        try {
            const { first_name, last_name, email } = req.body;

            // Check if the transaction with the given ID exists
            const employee = await Employee.findByPk(req.params.id);
            if (!employee) {
                return res.status(404).json({
                    success: false,
                    message: 'Employee not found.'
                });
            }

            employee.first_name = first_name;
            employee.last_name = last_name;
            employee.email = email;

            await employee.save();
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