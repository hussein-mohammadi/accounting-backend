import express from "express";
import EmployeeController from "../controllers/employee.controller.js";
import Authentication from "../controllers/authentication.controller.js";

const router = express.Router();

router.get("/employee", Authentication.authMiddleware, EmployeeController.getEmployees);

router.get("/employee/:id", Authentication.authMiddleware, EmployeeController.getEmployeeById);

router.post("/employee", Authentication.authMiddleware, EmployeeController.addEmployee);

router.put("/employee/:id", Authentication.authMiddleware, EmployeeController.updateEmployee);

router.delete("/employee/:id", Authentication.authMiddleware, EmployeeController.deleteEmployee);

export default router;