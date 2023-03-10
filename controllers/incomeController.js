import Joi from 'joi';
import Income from '../models/income.js';

export default class IncomeController {

  static async getIncomes(req, res) {
    
    try {
      // Parse pagination parameters
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      // Parse filter parameters
      const { start_date, end_date } = req.query;

      const whereClause = {};
      if (start_date) {
        whereClause.date = { [Op.gte]: new Date(start_date) };
      }

      if (end_date) {
        if (!whereClause.date) {
          whereClause.date = {};
        }
        whereClause.date[Op.lte] = new Date(end_date);
      }

      const income = await Income.findAndCountAll({
        where: whereClause,
        limit: limit,
        offset: offset,
      });

      if (!income.rows.length) {
        return res.json({
          success: true,
          message: "No income has been recorded.",
        });
      }
      res.json({
        success: true,
        data: income.rows,
        pagination: {
          page: page,
          limit: limit,
          totalRows: income.count,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }

  }

  static async getIncomeById(req , res){

    try {
      const income = await Income.findByPk(req.params.id);
      if (!income) {
        return res.status(404).json({
          success: false,
          message: 'Income not found.',
        });
      }
      res.json({
        success: true,
        data: income,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }

  }

  static async addIncome(req, res) {

    try {
      const incomeSchema = Joi.object({
        title: Joi.string().required(),
        date: Joi.date().required(),
        amount: Joi.number().required(),
        description: Joi.string().required(),
      });

      const { error, value } = incomeSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details.map((detail) => detail.message),
        });
      }

      const { title, date, amount, description } = value;
      const income = await Income.create({ title, date, amount, description });

      res.status(201).json({
        success: true,
        data: income,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  }


  static async updateIncome(req, res) {

    try {
      const incomeSchema = Joi.object({
        title: Joi.string().required(),
        date: Joi.date().required(),
        amount: Joi.number().min(0).required(),
        description: Joi.string(),
      });

      // Validate income data in the request body
      const { error, value } = incomeSchema.validate(req.body);

      // Check if there are any validation errors
      if (error) {
          return res.status(400).json({
              success: false,
              message: error.details[0].message,
          });
      }
      const { title, date, amount, description } = value;
  
      // Check if the transaction with the given ID exists
      const income = await Income.findByPk(req.params.id);
      if (!income) {
        return res.status(404).json({
          success: false,
          message: 'Income not found.',
        });
      }
  
      income.title = title;
      income.date = date;
      income.amount = amount;
      income.description = description;

      await income.save();

      res.json({
        success: true,
        data: income
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }

  }

  static async deleteIncome(req, res) {

    try {
      const income = await Income.findByPk(req.params.id);
      if (!income) {
        return res.status(404).json({
          success: false,
          message: 'Income not found.'
        });
      }
      await income.destroy();
      res.json({
        success: true,
        message: 'Income have been deleted.',
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