import express from "express";
import CostController from "../controllers/cost.controller.js";
import Authentication from "../controllers/authentication.controller.js";

const router = express.Router();

router.get("/cost", Authentication.authMiddleware, CostController.getCosts);

router.get("/cost/:id", Authentication.authMiddleware, CostController.getCostById);

router.post("/cost", Authentication.authMiddleware, CostController.addCost);

router.put("/cost/:id", Authentication.authMiddleware, CostController.updateCost);

router.delete("/cost/:id", Authentication.authMiddleware, CostController.deleteCost);

export default router;