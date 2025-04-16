import React, { useState } from "react";
import "./TechnicianLogin.css";
import scenery from "../../assets/scenery.jpg"; // Make sure you have a suitable image

const TechnicianLogin = () => {
  const [techId, setTechId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with ID:", techId, "Password:", password);
    // Connect to backend logic here
  };

  return (
    <div className="tech-login-container">
      <div
        className="login-background-overlay"
        style={{ backgroundImage: `url(${scenery})` }}
      ></div>

      <h2>Technician Login</h2>
      <form className="tech-login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your Technician ID"
          value={techId}
          onChange={(e) => setTechId(e.target.value)}
          required
          maxLength={6}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default TechnicianLogin;
