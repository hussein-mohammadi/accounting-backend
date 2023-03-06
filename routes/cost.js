import express from "express";
import CostController from "../controllers/costController.js";

const router = express.Router();

router.get("/cost", CostController.getCosts);

router.get("/cost/:id", CostController.getCostById);

router.post("/cost", CostController.addCost);

router.put("/cost/:id", CostController.updateCost);

router.delete("/cost/:id", CostController.deleteCost);

export default router;