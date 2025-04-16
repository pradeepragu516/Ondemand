import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TechnicianRequestPage.css"; // Ensure path is correct

const TechnicianRequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:4000/api/technician-requests/pending"; // Adjust API URL if needed

  useEffect(() => {
    fetchTechnicianRequests();
  }, []);

  const fetchTechnicianRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests(response.data || []);
    } catch (err) {
      console.error("Error fetching technician requests:", err);
      setError("Failed to load technician requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found.");
        return;
      }

      await axios.put(
        `http://localhost:4000/api/technician-requests/${id}/approve`,
        { email }, // Send email in the body of the request
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Technician approved. Login code sent via email.");
      fetchTechnicianRequests(); // Refresh the request list
    } catch (err) {
      console.error("Approval failed:", err);
      alert("Failed to approve technician.");
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found.");
        return;
      }

      await axios.put(
        `http://localhost:4000/api/technician-requests/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTechnicianRequests(); // Refresh the request list
    } catch (err) {
      console.error("Reject failed:", err);
      alert("Failed to reject technician.");
    }
  };

  return (
    <div className="tech-request-page">
      <h2>Technician Authentication Requests</h2>

      {loading && <p>Loading requests...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && requests.length === 0 && <p>No pending technician requests.</p>}

      {!loading && requests.length > 0 && (
        <table className="request-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID Card</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((tech) => (
              <tr key={tech._id}>
                <td>{tech.name}</td>
                <td>{tech.idCard}</td>
                <td>{tech.email}</td>
                <td>{tech.phone}</td>
                <td>
                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(tech._id, tech.email)}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleReject(tech._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TechnicianRequestPage;
