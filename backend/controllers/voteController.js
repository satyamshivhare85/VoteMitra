import UserFace from "../models/UserFace.js";
import { findMatchingUser } from "../utils/faceMatcher.js";
import { generateToken } from "../utils/generateToken.js";

export const verifyVoter = async (req, res) => {
  try {
    const { face } = req.body;

    if (!face || !face.length) {
      return res.status(400).json({
        success: false,
        message: "Face embedding required",
      });
    }
    

    // GET ALL USERS
    const users = await UserFace.find();

    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "No registered users",
      });
    }

    // FIND MATCH
    const result = findMatchingUser(users, face);

    // THRESHOLD
    const THRESHOLD = 0.45;

    if (
      !result.user ||
      result.distance > THRESHOLD
    ) {
      return res.status(401).json({
        success: false,
        message: "Face not recognized",
      });
    }

    // CHECK ALREADY VOTED
    if (result.user.hasVoted) {
      return res.status(403).json({
        success: false,
        voted: true,
        message: "Already voted",
      });
    }

    // GENERATE TOKEN
    const token = generateToken(result.user._id);

    return res.status(200).json({
      success: true,
      token,
      message: "Verification successful",
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};