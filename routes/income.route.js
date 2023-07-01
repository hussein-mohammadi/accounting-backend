import express from "express";
import IncomeController from "../controllers/income.controller.js";

const router = express.Router();

router.get("/income", Authentication.authMiddleware, IncomeController.getIncomes);

router.get("/income/:id", Authentication.authMiddleware, IncomeController.getIncomeById);

router.post("/income", Authentication.authMiddleware, IncomeController.addIncome);

router.put("/income/:id", Authentication.authMiddleware, IncomeController.updateIncome);

router.delete("/income/:id", Authentication.authMiddleware, IncomeController.deleteIncome);

export default router;