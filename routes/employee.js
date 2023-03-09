import express from "express";
import EmployeeController from "../controllers/employeeController.js";

const router = express.Router();

router.get("/employee", EmployeeController.getEmployees);

router.get("/employee/:id", EmployeeController.getEmployeeById);

router.post("/employee", EmployeeController.addEmployee);

router.put("/employee/:id", EmployeeController.updateEmployee);

router.delete("/employee/:id", EmployeeController.deleteEmployee);

export default router;