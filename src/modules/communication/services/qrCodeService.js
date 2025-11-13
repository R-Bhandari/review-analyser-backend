import QRCode from "qrcode";
import fs from "fs";
import path from "path";

class QRCodeService {
  static async generateBranchQR(branchId, feedbackUrl) {
    try {
      const folderPath = path.join("uploads", "qrcodes");

      // Ensure directory exists
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      const filePath = path.join(folderPath, `branch_${branchId}.png`);

      await QRCode.toFile(filePath, feedbackUrl, {
        width: 400,
      });

      return filePath;
    } catch (error) {
      console.error("QR Code generation failed:", error);
      throw new Error("Unable to generate QR code");
    }
  }
}

export default QRCodeService;
