import React, { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      alert("Registracija uspešna! Zdaj se lahko prijavite.");
      navigate("/login");
    } catch (error) {
      alert("Napaka pri registraciji: " + (error.response?.data?.message || "Preverite podatke in poskusite znova."));
    }
  };

  return (
    <div>
      <h2>Registracija</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Ime"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Geslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registracija</button>
      </form>
      <p>
        Že imate račun? <a href="/login">Prijavite se tukaj</a>
      </p>
    </div>
  );
};

export default Register;
