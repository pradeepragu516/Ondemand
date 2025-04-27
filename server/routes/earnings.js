const express = require("express");
const router = express.Router();
const Earning = require("../models/Earning");

// Get earning history for a technician
router.get("/history/:technicianId", async (req, res) => {
  try {
    const earnings = await Earning.find({ technicianId: req.params.technicianId }).sort({ date: -1 });
    res.status(200).json(earnings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch earnings" });
  }
});

// Add a new earning record
router.post("/add", async (req, res) => {
  const { technicianId, job, amount, date } = req.body;

  try {
    const newEarning = new Earning({
      technicianId,
      job,
      amount,
      date,
    });

    const savedEarning = await newEarning.save();
    res.status(201).json(savedEarning);
  } catch (err) {
    res.status(500).json({ error: "Failed to save earning" });
  }
});

module.exports = router;
