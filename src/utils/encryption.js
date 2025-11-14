import crypto from "crypto";

const ALGO = "aes-256-cbc";
const KEY = crypto
  .createHash("sha256")
  .update(process.env.SECRET_MASTER_KEY)
  .digest();
const IV = Buffer.alloc(16, 0); // 16 bytes IV

export const encrypt = (text) => {
  const cipher = crypto.createCipheriv(ALGO, KEY, IV);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decrypt = (encryptedText) => {
  const decipher = crypto.createDecipheriv(ALGO, KEY, IV);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
