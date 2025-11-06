import Role from "../models/roleModel.js";

// ➤ Create a new role
export const createRole = async (req, res) => {
  try {
    const { name, description, permissions, level, isDefault } = req.body;

    const existingRole = await Role.findOne({ name });
    if (existingRole)
      return res.status(400).json({ message: "Role already exists" });

    const role = await Role.create({
      name,
      description,
      permissions,
      level,
      isDefault,
    });

    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get all roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find().sort({ level: 1 });
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get role by ID
export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role)
      return res.status(404).json({ success: false, message: "Role not found" });
    res.status(200).json({ success: true, data: role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete role
export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role)
      return res.status(404).json({ success: false, message: "Role not found" });

    if (role.isDefault)
      return res.status(400).json({ message: "Default roles cannot be deleted" });

    await role.deleteOne();
    res.status(200).json({ success: true, message: "Role deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
