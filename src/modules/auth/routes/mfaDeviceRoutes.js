import express from "express";
import {
  registerMfaDevice,
  verifyMfaDevice,
  generateBackupCodes,
  getUserMfaDevices,
  disableMfaDevice,
  deleteMfaDevice
} from "../controllers/mfaDeviceController.js";

const router = express.Router();

router.post("/register", registerMfaDevice);
router.post("/verify/:id", verifyMfaDevice);
router.post("/backup-codes", generateBackupCodes);
router.get("/user/:userId", getUserMfaDevices);
router.put("/disable/:id", disableMfaDevice);
router.delete("/:id", deleteMfaDevice);

export default router;
