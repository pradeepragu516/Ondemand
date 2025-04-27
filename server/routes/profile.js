const express = require("express");
const router = express.Router();
const Profile = require("../models/profileModel"); // Use consistent model

// ✅ Create or fetch a technician
router.post("/createOrFetch", async (req, res) => {
  try {
    // Find the first available technician (for demo/testing)
    let technician = await Profile.findOne();

    // If not found, create a new one
    if (!technician) {
      technician = new Profile({
        name: "New Technician",
        email: "tech@example.com",
        phone: "0000000000",
        address: "Unknown",
        idProof: "N/A",
        availability: "Available",
        skills: [],
        profileImg: "",
      });

      await technician.save();
    }

    res.json(technician);
  } catch (err) {
    console.error("Error creating/fetching technician:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get technician by ID
router.get("/profile/:technicianId", async (req, res) => {
  try {
    const technician = await Profile.findById(req.params.technicianId);
    if (!technician) {
      return res.status(404).json({ error: "Technician not found" });
    }
    res.json(technician);
  } catch (error) {
    console.error("Error fetching technician:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Update technician by ID
router.put("/profile/:technicianId", async (req, res) => {
  try {
    const updatedTechnician = await Profile.findByIdAndUpdate(
      req.params.technicianId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedTechnician) {
      return res.status(404).json({ message: "Technician not found" });
    }
    res.status(200).json(updatedTechnician);
  } catch (err) {
    console.error("Error updating technician profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
