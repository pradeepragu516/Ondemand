// src/components/technicianpanel/Profile.jsx
import React, { useState } from "react";
import "./Profile.css";
import { Pencil, ToggleLeft, ToggleRight } from "lucide-react";
import technicianImg from "../../assets/technician.jpg"; // Local image
// import placeholderImg from "../../assets/placeholder.jpg"; // Optional fallback

const Profile = () => {
  const [availability, setAvailability] = useState("Available");

  const technician = {
    name: "Ravi Kumar",
    email: "ravi.kumar@example.com",
    phone: "+91 98765 43210",
    address: "Chennai, Tamil Nadu",
    skills: ["Electrician", "Plumber", "Carpentry"],
    idProof: "Aadhar Card - XXXXXX1234",
    profileImg: technicianImg || placeholderImg, // Fallback if missing
  };

  const toggleAvailability = () =>
    setAvailability((prev) => (prev === "Available" ? "Unavailable" : "Available"));

  return (
    <div className="profile-container">
      <h2>👷 Technician Profile</h2>

      <div className="profile-card">
        <div className="profile-left">
          <img
            src={technician.profileImg}
            alt="Technician"
            className="profile-img"
            onError={(e) => (e.target.src = placeholderImg)} // fallback on error
          />

          <span className={`status-tag ${availability.toLowerCase()}`}>
            {availability}
          </span>

          <button className="toggle-btn" onClick={toggleAvailability}>
            {availability === "Available" ? (
              <>
                <ToggleRight size={20} /> Set Unavailable
              </>
            ) : (
              <>
                <ToggleLeft size={20} /> Set Available
              </>
            )}
          </button>
        </div>

        <div className="profile-right">
          <div className="profile-header">
            <h3>{technician.name}</h3>
            <button className="edit-btn">
              <Pencil size={16} /> Edit Profile
            </button>
          </div>

          <p><strong>Email:</strong> {technician.email}</p>
          <p><strong>Phone:</strong> {technician.phone}</p>
          <p><strong>Location:</strong> {technician.address}</p>
          <p><strong>ID Proof:</strong> {technician.idProof}</p>

          <div className="skills">
            <strong>Skills:</strong>
            <div className="skill-tags">
              {technician.skills.map((skill, index) => (
                <span className="skill-tag" key={index}>🔧 {skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
