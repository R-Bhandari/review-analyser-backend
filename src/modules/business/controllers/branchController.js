import Branch from "../models/branchModel.js";

// ➤ Create a new branch
export const createBranch = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    res.status(201).json({
      success: true,
      message: "Branch created successfully",
      data: branch,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating branch",
      error: error.message,
    });
  }
};

// ➤ Get all branches
export const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find().populate("businessId", "name email");
    res.status(200).json({ success: true, data: branches });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching branches",
    });
  }
};

// ➤ Get a single branch by ID
export const getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id).populate(
      "businessId",
      "name email"
    );
    if (!branch)
      return res
        .status(404)
        .json({ success: false, message: "Branch not found" });
    res.status(200).json({ success: true, data: branch });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching branch",
    });
  }
};

// ➤ Get all branches of a specific business
export const getBranchesByBusiness = async (req, res) => {
  try {
    const branches = await Branch.find({
      businessId: req.params.businessId,
    });
    res.status(200).json({ success: true, data: branches });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching branches for business",
    });
  }
};
