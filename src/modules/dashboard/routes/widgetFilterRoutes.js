import express from "express";
import {
  saveWidgetFilter,
  getWidgetFilter,
  deleteWidgetFilter
} from "../controllers/widgetFilterController.js";

const router = express.Router();

router.post("/", saveWidgetFilter);
router.get("/", getWidgetFilter);
router.delete("/:id", deleteWidgetFilter);

export default router;
