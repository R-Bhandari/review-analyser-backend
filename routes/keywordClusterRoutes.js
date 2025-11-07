import express from "express";
import {
  upsertKeywordCluster,
  getAllKeywordClusters,
  getKeywordClusterById,
  deleteKeywordCluster,
} from "../controllers/keywordClusterController.js";

const router = express.Router();

router.post("/", upsertKeywordCluster);
router.get("/", getAllKeywordClusters);
router.get("/:id", getKeywordClusterById);
router.delete("/:id", deleteKeywordCluster);

export default router;
