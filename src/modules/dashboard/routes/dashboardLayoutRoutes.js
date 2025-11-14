import express from "express";
import {
  createDashboardLayout,
  getDashboardByKey,
  updateDashboardLayout,
  deleteDashboardLayout
} from "../controllers/dashboardLayoutController.js";

const router = express.Router();

router.post("/", createDashboardLayout);
router.get("/:key", getDashboardByKey);
router.put("/:key", updateDashboardLayout);
router.delete("/:key", deleteDashboardLayout);

export default router;
