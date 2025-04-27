// routes/serviceRequests.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
const Technician = require('../models/Technician');
const AssignedJob = require('../models/jobAssignment'); // Assuming you have this model

// Fetch all service requests
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('technician');
    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update service request status
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign technician to a request
router.put('/:id/assign', async (req, res) => {
  const { id } = req.params;
  const { technicianId } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

    appointment.technician = technicianId;
    await appointment.save();

    // Create new assigned job
    const assignedJob = new AssignedJob({
      appointmentId: appointment._id,
      technicianId,
      services: appointment.services,
      date: appointment.date,
      total: appointment.total,
      address: appointment.address,
      status: "Assigned",
    });
    await assignedJob.save();

    res.json({ message: 'Technician assigned and job created successfully' });
  } catch (err) {
    console.error('Error assigning technician:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete service request
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Appointment.findByIdAndDelete(id);
    res.json({ message: 'Service request cancelled.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;