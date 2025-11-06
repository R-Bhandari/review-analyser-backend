import Department from "../models/departmentModel.js";

// ➤ Create a new department
export const createDepartment = async (req, res) => {
  try {
    const { businessId, branchId, name, description, head } = req.body;

    const existingDept = await Department.findOne({
      businessId,
      branchId,
      name,
    });
    if (existingDept)
      return res
        .status(400)
        .json({ message: "Department with this name already exists" });

    const department = await Department.create({
      businessId,
      branchId,
      name,
      description,
      head,
    });

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: department,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get all departments
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate("businessId", "name email")
      .populate("branchId", "name city")
      .populate("head", "name email role");

    res.status(200).json({ success: true, data: departments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get departments by business
export const getDepartmentsByBusiness = async (req, res) => {
  try {
    const departments = await Department.find({
      businessId: req.params.businessId,
    }).populate("branchId", "name city");

    res.status(200).json({ success: true, data: departments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get department by ID
export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate("branchId", "name")
      .populate("head", "name email role");
    if (!department)
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });

    res.status(200).json({ success: true, data: department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
