import Employee from '../models/employee.js';

export default class EmployeeController {

    static async getEmployees(req, res) {

        try {
            const employees = await Employee.findAll();
            if(!employees) {
                res.json('There are no employee.');
            }
            res.json(employees);
        } catch (error) {
            console.error(error);
            res.status(500).json('Server error');
        }

    }
  
    static async getEmployeeById(req , res){

        try {
            const employee = await Employee.findByPk(req.params.id);
            if (!employee) {
                return res.status(404).json('Employee not found');
            }
            res.json(employee);
        } catch (error) {
            console.error(error);
            res.status(500).json('Server error');
        }

    }
  
    static async addEmployee(req, res) {

        try {
            const { title, date, amount, description } = req.body;

            // Check if the employee with the given ID exists

            const employee = await Employee.create({ title, date, amount, description });
            res.status(201).json(employee);
        } catch (error) {
            console.error(error);
            res.status(500).json('Server error');
        }

    }
  
    static async updateEmployee(req, res) {

        try {
            const { title, date, amount, description } = req.body;

            // Check if the transaction with the given ID exists
            const employee = await Employee.findByPk(req.params.id);
            console.log(employee)
            if (!employee) {
            return res.status(404).json('Employee not found');
            }

            employee.first_name = first_name;
            employee.last_name = last_name;
            employee.email = email;

            await employee.save();
            res.json(employee);
        } catch (error) {
            console.error(error);
            res.status(500).json('Server error');
        }

    }
  
    static async deleteEmployee(req, res) {

        try {
            const employee = await Employee.findByPk(req.params.id);
            if (!employee) {
            return res.status(404).json('Employee not found');
            }
            await employee.destroy();
            res.json('Employee deleted');
        } catch (error) {
            console.error(error);
            res.status(500).json('Server error');
        }

    }

}