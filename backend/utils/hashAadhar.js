import crypto from "crypto";

// FIX 5: HMAC instead of plain SHA-256
// Plain SHA-256 of a 12-digit number = brute-forceable in seconds
// Set AADHAR_SECRET in your .env file — any long random string
export const hashAadhar = (aadhar) => {
  return crypto
    .createHmac("sha256", process.env.AADHAR_SECRET)
    .update(aadhar)
    .digest("hex");
};