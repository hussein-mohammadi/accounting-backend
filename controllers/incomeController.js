import Income from '../models/income.js';

export default class IncomeController {

    static async getIncomes(req, res) {
      try {
        const incomes = await Income.findAll();
        res.json(incomes);
      } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
      }
    }

    static async getIncomeById(req , res){
      try {
        const income = await Income.findByPk(req.params.id);
        if (!income) {
          return res.status(404).json('Income not found');
        }
        res.json(income);
      } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
      }
    }

    static async addIncome(req, res) {

      try {
        const { title, date, amount, description } = req.body;
  
        // Check if the employee with the given ID exists

        const income = await Income.create({ title, date, amount, description });
        res.status(201).json(income);
      } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
      }

    }

    static async updateIncome(req, res) {
      try {
        const { title, date, amount, description } = req.body;
    
        // Check if the transaction with the given ID exists
        const income = await Income.findByPk(req.params.id);
        console.log(income)
        if (!income) {
          return res.status(404).json('Income not found');
        }
    
        income.title = title;
        income.date = date;
        income.amount = amount;
        income.description = description;

        await income.save();
        res.json(income);
      } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
      }
    }

    static async deleteIncome(req, res) {
      try {
        const income = await Income.findByPk(req.params.id);
        if (!income) {
          return res.status(404).json('Income not found');
        }
        await income.destroy();
        res.json('Income deleted');
      } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
      }
    }

}