import React, { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";

export default function App() {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  // Ob zagonu preveri localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedName = localStorage.getItem("userName");
    if (savedToken) setToken(savedToken);
    if (savedName) setUserName(savedName);
  }, []);

  // Shrani token in uporabniško ime
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    if (userName) localStorage.setItem("userName", userName);
  }, [token, userName]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken(null);
    setUserName("");
    setShowProfile(false);
    toast.info("Odjavljen");
  };

  const handleRegistered = (token, name) => {
    setToken(token);
    setUserName(name);
    toast.success(`Registracija uspešna! Dobrodošel, ${name}`);
  };

  const handleLoggedIn = (token, name) => {
    setToken(token);
    setUserName(name);
    toast.success(`Prijava uspešna! Dobrodošel nazaj, ${name}`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Segoe UI" }}>
      {/* Zgornja vrstica */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          background: "#f1f1f1",
          padding: "10px 20px",
          borderRadius: "8px"
        }}
      >
        <h2 style={{ margin: 0 }}>User Service Micro-Frontend</h2>
        {userName && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaUser color="purple" />
            <strong>{userName}</strong>
            <button onClick={() => setShowProfile(!showProfile)}>
              {showProfile ? "Skrij profil" : "Moj račun"}
            </button>
            <button onClick={handleLogout} style={{ background: "#dc3545" }}>
              Logout
            </button>
          </div>
        )}
      </div>

      {!token ? (
        <>
          <h3>Registracija</h3>
          <Register onRegistered={handleRegistered} />
          <hr />
          <h3>Prijava</h3>
          <Login onLoggedIn={handleLoggedIn} />
        </>
      ) : showProfile ? (
        <div>
          <h3>👤 Moj profil</h3>
          <p><strong>Uporabniško ime:</strong> {userName}</p>
          <p><strong>JWT Token:</strong></p>
          <pre
            style={{
              background: "#f8f9fa",
              padding: "10px",
              borderRadius: "6px",
              wordBreak: "break-all"
            }}
          >
            {token}
          </pre>
        </div>
      ) : (
        <div>
          <h3>🥳 Prijavljen!</h3>
          <p>Uporabi gumb "Moj račun" za ogled podrobnosti.</p>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
