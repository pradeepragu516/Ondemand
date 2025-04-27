const mongoose = require("mongoose");

const technicianSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    password: String,
    address: String,
    idProof: String,
    status: { type: String, default: "Pending" },
    skills: [String],
    availability: { type: String, default: "Available" },
    profileImg: String,
  },
  { timestamps: true }
);

// Export as "Profile" (schema name remains "profile")
module.exports = mongoose.model("Profile", technicianSchema);
