import UserFace from "../models/UserFace.js";
import { hashAadhar } from "../utils/hashAadhar.js";

const euclideanDistance = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return Infinity;
  return Math.sqrt(a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0));
};

const THRESHOLD = 0.42;

export const registerUser = async (req, res) => {
  try {
    const { aadhar, faces } = req.body;

    if (!aadhar) {
      return res.status(400).json({ success: false, message: "Aadhar missing" });
    }
    if (!Array.isArray(faces) || faces.length === 0) {
      return res.status(400).json({ success: false, message: "Faces array invalid" });
    }
    if (!Array.isArray(faces[0])) {
      return res.status(400).json({ success: false, message: "Embedding format invalid" });
    }

    const aadharHash = hashAadhar(aadhar);
    const existingAadhar = await UserFace.findOne({ aadharHash });

    if (existingAadhar) {
      // FIX 2: Added 'code' field — frontend reads err.response.data.code
      return res.status(409).json({
        success: false,
        code: "AADHAR_DUPLICATE",
        message: "Aadhar already registered",
      });
    }

    const descriptorLength = faces[0].length;
    const avgEmbedding = new Array(descriptorLength).fill(0);

    faces.forEach((face) => {
      if (!Array.isArray(face)) return;
      face.forEach((v, i) => { avgEmbedding[i] += Number(v) || 0; });
    });

    for (let i = 0; i < descriptorLength; i++) {
      avgEmbedding[i] /= faces.length;
    }

    if (avgEmbedding.some((v) => isNaN(v))) {
      return res.status(400).json({ success: false, message: "Invalid embedding computed" });
    }

    const users = await UserFace.find();
    for (const user of users) {
      const storedEmbedding = user.embeddings?.[0];
      if (!storedEmbedding) continue;

      const dist = euclideanDistance(avgEmbedding, storedEmbedding);
      console.log("Distance:", dist);

      if (dist < THRESHOLD) {
        // FIX 2: Added 'code' field — frontend reads err.response.data.code
        return res.status(409).json({
          success: false,
          code: "FACE_DUPLICATE",
          message: "Face already registered",
        });
      }
    }

    const newUser = new UserFace({
      aadharHash,
      embeddings: [avgEmbedding],
    });

    await newUser.save();

    return res.status(201).json({ success: true, message: "Registration successful" });

  } catch (err) {
    console.log("Register error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};