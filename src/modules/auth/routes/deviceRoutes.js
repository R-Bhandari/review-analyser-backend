import express from "express";
import {
  registerDevice,
  getDevicesByUser,
  disableDevice,
  trustDevice,
  deleteDevice
} from "../controllers/deviceController.js";

const router = express.Router();

router.post("/register", registerDevice);
router.get("/user/:userId", getDevicesByUser);
router.put("/disable/:id", disableDevice);
router.put("/trust/:id", trustDevice);
router.delete("/:id", deleteDevice);

export default router;
