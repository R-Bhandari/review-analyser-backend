import Business from "../models/businessModel.js";

// Create a new business
export const createBusiness = async (req, res) => {
  try {
    const business = await Business.create(req.body);
    res.status(201).json({
      success: true,
      message: "Business created successfully",
      data: business,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all businesses
export const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.status(200).json({ success: true, data: businesses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get single business by ID
export const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business)
      return res.status(404).json({ success: false, message: "Business not found" });
    res.status(200).json({ success: true, data: business });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
