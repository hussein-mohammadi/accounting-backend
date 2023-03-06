import express from "express";
import IncomeController from "../controllers/incomeController.js";

const router = express.Router();

router.get("/income", IncomeController.getIncomes);

router.get("/income/:id", IncomeController.getIncomeById);

router.post("/income", IncomeController.addIncome);

router.put("/income/:id", IncomeController.updateIncome);

router.delete("/income/:id", IncomeController.deleteIncome);

export default router;