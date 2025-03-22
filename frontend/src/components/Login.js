import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });

      console.log("✅ Prijava uspešna:", data);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Napaka pri prijavi:", error.response ? error.response.data : error);
      alert("Napaka pri prijavi: " + (error.response?.data?.message || "Preverite svoje podatke."));
    }
  };

  return (
    <div>
      <h2>Prijava</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Prijava</button>
      </form>
      <p>
        Nimate računa? <a href="/register">Registrirajte se tukaj</a>
      </p>
    </div>
  );
};

export default Login;
