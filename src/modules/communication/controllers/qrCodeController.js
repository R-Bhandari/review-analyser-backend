import QRCodeService from "../services/qrCodeService.js";
import Branch from "../../business/models/branchModel.js";

// ➤ Generate QR for a branch
export const generateBranchQRCode = async (req, res) => {
  try {
    const { branchId } = req.params;

    // fetch branch to confirm it exists
    const branch = await Branch.findById(branchId);
    if (!branch)
      return res.status(404).json({ success: false, message: "Branch not found" });

    // branch link → you can adjust the frontend route
    const feedbackUrl = `https://yourdomain.com/feedback/${branchId}`;

    const qrPath = await QRCodeService.generateBranchQR(branchId, feedbackUrl);

    res.status(200).json({
      success: true,
      message: "QR code generated successfully",
      qrPath,
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
