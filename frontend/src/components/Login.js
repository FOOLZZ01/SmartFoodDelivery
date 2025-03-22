import React, { Component } from "react";
import { login } from "../api";
import { Navigate } from "react-router-dom";
import "./Login.css"; // Preveri, da je v isti mapi kot Login.js

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      redirect: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const { data } = await login({ email, password });
      console.log("✅ Prijava uspešna:", data);
      localStorage.setItem("token", data.token);
      this.setState({ redirect: true });
    } catch (error) {
      console.error("❌ Napaka pri prijavi:", error.response ? error.response.data : error);
      this.setState({ error: error.response?.data?.error || "Napaka pri prijavi. Poskusite znova." });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <div className="login-container">
        <h2>Prijava</h2>
        {this.state.error && <p className="error-message">{this.state.error}</p>}
        <form onSubmit={this.handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Geslo"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Prijava</button>
        </form>
        <p>
          Nimate računa? <a href="/register">Registrirajte se tukaj</a>
        </p>
      </div>
    );
  }
}

export default Login;
