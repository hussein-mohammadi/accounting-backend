import Joi from "joi";

import Cost from "../models/cost.js";
import Employee from "../models/employee.js";

export default class CostController {

    static async getCosts(req, res) {

        const page = parseInt(req.query.page) || 1; // default to page 1
        const pageSize = parseInt(req.query.pageSize) || 10; // default to 10 items per page    

        try {
            const costsCount = await Cost.count();
            const pageCount = Math.ceil(costsCount / pageSize);
            const costs = await Cost.findAll({
                offset: (page - 1) * pageSize,
                limit: pageSize,
            });
            
            if(!costs.length) {
                return res.json({
                    success: true,
                    message: 'No cost have been recorded.',
                });
            }
            res.json({
                success: true,
                data: costs,
                pageInfo: {
                    page,
                    pageSize,
                    pageCount,
                    totalCount: costsCount,
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Server error',
            });
        }

    }

    static async getCostById(req , res){

        try {
            const cost = await Cost.findByPk(req.params.id);
            if (!cost) {
                return res.status(404).json({
                    success: false,
                    message: 'Cost not found.',
                });
            }
            res.json({
                success: true,
                data: cost
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Server error',
            });
        }

    }

    static async addCost(req, res) {

      try {
        const schema = Joi.object({
          title: Joi.string().required(),
          date: Joi.date().required(),
          amount: Joi.number().required(),
          description: Joi.string().optional(),
          employee_id: Joi.number().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
          return res.status(400).json({
            success: false,
            message: error.details[0].message,
          });
        }
    
        const { title, date, amount, description, employee_id } = req.body;
    
        const employee = await Employee.findByPk(employee_id);
    
        if (!employee) {
          return res.status(404).json({
            success: false,
            message: 'Employee not found.',
          });
        }
    
        const cost = await Cost.create({
          title,
          date,
          amount,
          description,
          employee_id,
        });
    
        res.json({
          success: true,
          data: cost,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Server error',
        });
      }

    }    

    static async updateCost(req, res) {


        const schema = Joi.object({
            title: Joi.string().required(),
            date: Joi.date().required(),
            amount: Joi.number().required(),
            description: Joi.string().optional(),
            employee_id: Joi.number().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
            success: false,
            message: error.details[0].message,
            });
        }

        try {
        
            const { title, date, amount, description, employee_id } = req.body;
        
            const cost = await Cost.findByPk(req.params.id);
            if (!cost) {
            return res.status(404).json({
                success: false,
                message: 'Cost not found.',
            });
            }
        
            const employee = await Employee.findByPk(employee_id);
            if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found.',
            });
            }
        
            cost.title = title;
            cost.date = date;
            cost.amount = amount;
            cost.description = description;
            cost.employee_id = employee_id;
        
            await cost.save();
        
            res.json({
                success: true,
                data: cost,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Server error',
            });
        }

    }    

    static async deleteCost(req, res) {
        
        try {
            const cost = await Cost.findByPk(req.params.id);

            if(!cost){
                return res.json({
                    success: false,
                    message: 'Cost not found.'
                })
            }

            await cost.destroy();
            res.json({
                success: true,
                message: 'Cost deleted.'
            })

        } catch (error) {
            console.error(error)
            res.status(500).json({
                success: false,
                message: 'Server error' 
            })
        }

    }

}