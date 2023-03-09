import Joi from 'joi';
import Income from '../models/income.js';

export default class IncomeController {

  static async getIncomes(req, res) {
    
    const page = parseInt(req.query.page) || 1; // default to page 1
    const pageSize = parseInt(req.query.pageSize) || 10; // default to 10 items per page    

    try {
      const incomesCount = await Income.count();
      const pageCount = Math.ceil(incomesCount / pageSize);
      const incomes = await Income.findAll({
          offset: (page - 1) * pageSize,
          limit: pageSize,
      });

      if(!incomes.length) {
        return res.json({
          success: true,
          message: 'No income have been recorded.',
        });
      }
      res.json({
        success: true,
        data: incomes,
        pageInfo: {
            page,
            pageSize,
            pageCount,
            totalCount: incomesCount,
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

    const incomeSchema = Joi.object({
      title: Joi.string().required(),
      date: Joi.date().required(),
      amount: Joi.number().required(),
      description: Joi.string().required(),
    });


    try {
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

    try {
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