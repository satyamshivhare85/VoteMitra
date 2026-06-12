import Complaint from "../models/Complaint.js";

export const createComplaint = async (req, res) => {
  console.log("===== COMPLAINT API HIT =====");

  try {
    console.log("Request Body:", req.body);

    const { text, location } = req.body;

    console.log("Text:", text);
    console.log("Location:", location);

    // Validation
    if (!text || !location) {
      console.log("Validation Failed");

      return res.status(400).json({
        success: false,
        message: "Complaint text and location are required",
      });
    }

    console.log("Creating complaint in DB...");

    // Save complaint
    const newComplaint = await Complaint.create({
      text,
      location,
    });

    console.log("Complaint Saved Successfully");
    console.log(newComplaint);

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint: newComplaint,
    });

  } catch (error) {
    console.log("===== ERROR IN COMPLAINT API =====");

    console.log("Error Message:", error.message);

    // Full mongoose/server error
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};