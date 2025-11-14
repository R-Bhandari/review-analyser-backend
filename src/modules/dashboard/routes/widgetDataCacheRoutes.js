import express from "express";
import {
  saveCache,
  getCache,
  expireCache,
  deleteCache
} from "../controllers/widgetDataCacheController.js";

const router = express.Router();

router.post("/", saveCache);
router.get("/", getCache);
router.put("/expire/:id", expireCache);
router.delete("/:id", deleteCache);

export default router;
