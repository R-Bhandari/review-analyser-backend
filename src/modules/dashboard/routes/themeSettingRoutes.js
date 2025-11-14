import express from "express";
import {
  saveThemeSetting,
  getThemeSetting,
  deleteThemeSetting
} from "../controllers/themeSettingController.js";

const router = express.Router();

router.post("/", saveThemeSetting);
router.get("/", getThemeSetting);
router.delete("/:id", deleteThemeSetting);

export default router;
