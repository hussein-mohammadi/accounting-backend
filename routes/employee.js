import express from "express";
import EmployeeController from "../controllers/employeeController.js";

const router = express.Router();

router.get("/empoloyee", EmployeeController.getEmployees);

router.get("/empoloyee/:id", EmployeeController.getEmployeeById);

router.post("/empoloyee", EmployeeController.addEmployee);

router.put("/empoloyee/:id", EmployeeController.updateEmployee);

router.delete("/empoloyee/:id", EmployeeController.deleteEmployee);

export default router;