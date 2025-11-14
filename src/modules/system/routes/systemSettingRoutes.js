import express from "express";
import {
  createSystemSetting,
  getAllSystemSettings,
  getSystemSettingByKey,
  updateSystemSetting,
  deleteSystemSetting
} from "../controllers/systemSettingController.js";

const router = express.Router();

router.post("/", createSystemSetting);
router.get("/", getAllSystemSettings);
router.get("/:key", getSystemSettingByKey);
router.put("/:key", updateSystemSetting);
router.delete("/:key", deleteSystemSetting);

export default router;
