import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Pencil, ToggleLeft, ToggleRight } from "lucide-react";
import axios from "axios";
import technicianImg from "../../assets/technician.jpg";
// import placeholderImg from "../../assets/placeholder.jpg"; // fallback image

const Profile = () => {
  const [availability, setAvailability] = useState("Available");
  const [showEditModal, setShowEditModal] = useState(false);
  const [technician, setTechnician] = useState(null);
  const [editedTech, setEditedTech] = useState({});

  const technicianId = "YOUR_TECHNICIAN_ID_HERE"; // Replace this with actual ID from login/session

  // Fetch technician profile
  useEffect(() => {
    const fetchTechnician = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/profile/${technicianId}`);
        setTechnician(res.data);
        setEditedTech(res.data);
      } catch (error) {
        console.error("Error fetching technician data", error);
      }
    };

    fetchTechnician();
  }, [technicianId]);

  const toggleAvailability = () => {
    const newAvailability = availability === "Available" ? "Unavailable" : "Available";
    setAvailability(newAvailability);
    setEditedTech((prev) => ({ ...prev, availability: newAvailability }));
  };

  const handleEditChange = (field, value) => {
    setEditedTech((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSkillChange = (index, value) => {
    const updatedSkills = [...editedTech.skills];
    updatedSkills[index] = value;
    setEditedTech((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const handleAddSkill = () => {
    setEditedTech((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...editedTech.skills];
    updatedSkills.splice(index, 1);
    setEditedTech((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`http://localhost:4000/api/profile/${technicianId}`, editedTech);
      setTechnician(res.data);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  if (!technician) return <div>Loading technician data...</div>;

  return (
    <div className="profile-container">
      <h2>👷 Technician Profile</h2>

      <div className="profile-card">
        <div className="profile-left">
          <img
            src={technician.profileImg || technicianImg}
            alt="Technician"
            className="profile-img"
            onError={(e) => (e.target.src = technicianImg)}
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
            <button className="edit-btn" onClick={() => {
              setEditedTech(technician); // reset edits
              setShowEditModal(true);
            }}>
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
              {technician.skills?.map((skill, index) => (
                <span className="skill-tag" key={index}>🔧 {skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Profile</h3>

            <label>Name:</label>
            <input
              type="text"
              value={editedTech.name || ""}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />

            <label>Email:</label>
            <input
              type="email"
              value={editedTech.email || ""}
              onChange={(e) => handleEditChange("email", e.target.value)}
            />

            <label>Phone:</label>
            <input
              type="text"
              value={editedTech.phone || ""}
              onChange={(e) => handleEditChange("phone", e.target.value)}
            />

            <label>Address:</label>
            <input
              type="text"
              value={editedTech.address || ""}
              onChange={(e) => handleEditChange("address", e.target.value)}
            />

            <label>ID Proof:</label>
            <input
              type="text"
              value={editedTech.idProof || ""}
              onChange={(e) => handleEditChange("idProof", e.target.value)}
            />

            <label>Skills:</label>
            {editedTech.skills?.map((skill, index) => (
              <div key={index} className="skill-edit-row">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleEditSkillChange(index, e.target.value)}
                />
                <button onClick={() => handleRemoveSkill(index)}>❌</button>
              </div>
            ))}
            <button onClick={handleAddSkill}>➕ Add Skill</button>

            <div className="modal-actions">
              <button onClick={handleSave}>💾 Save</button>
              <button className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
