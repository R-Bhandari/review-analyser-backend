import KeywordCluster from "../models/keywordClusterModel.js";

// ➤ Create or Update Cluster
export const upsertKeywordCluster = async (req, res) => {
  try {
    const { business, branch, clusterName } = req.body;

    let cluster = await KeywordCluster.findOne({ business, branch, clusterName });
    if (cluster) {
      cluster = await KeywordCluster.findByIdAndUpdate(cluster._id, req.body, { new: true });
      return res.status(200).json({ success: true, message: "Cluster updated", data: cluster });
    }

    const newCluster = await KeywordCluster.create(req.body);
    res.status(201).json({ success: true, message: "Cluster created", data: newCluster });
  } catch (error) {
    console.error("Error saving keyword cluster:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get All Clusters
export const getAllKeywordClusters = async (req, res) => {
  try {
    const { businessId, branchId } = req.query;
    const filter = {};
    if (businessId) filter.business = businessId;
    if (branchId) filter.branch = branchId;

    const clusters = await KeywordCluster.find(filter)
      .populate("business", "name")
      .populate("branch", "name")
      .populate("relatedTag", "name color")
      .sort({ totalMentions: -1 });

    res.status(200).json({ success: true, data: clusters });
  } catch (error) {
    console.error("Error fetching clusters:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get Cluster by ID
export const getKeywordClusterById = async (req, res) => {
  try {
    const cluster = await KeywordCluster.findById(req.params.id)
      .populate("business", "name")
      .populate("branch", "name")
      .populate("relatedTag", "name color");

    if (!cluster)
      return res.status(404).json({ success: false, message: "Cluster not found" });

    res.status(200).json({ success: true, data: cluster });
  } catch (error) {
    console.error("Error fetching cluster:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete Cluster
export const deleteKeywordCluster = async (req, res) => {
  try {
    const deleted = await KeywordCluster.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Cluster not found" });

    res.status(200).json({ success: true, message: "Cluster deleted" });
  } catch (error) {
    console.error("Error deleting cluster:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
