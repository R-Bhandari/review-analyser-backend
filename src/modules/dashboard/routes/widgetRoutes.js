import express from "express";
import {
  createWidget,
  getAllWidgets,
  getWidgetByKey,
  deleteWidget,
} from "../controllers/widgetController.js";

const router = express.Router();

router.post("/", createWidget);
router.get("/", getAllWidgets);
router.get("/:key", getWidgetByKey);
router.delete("/:key", deleteWidget);

export default router;
