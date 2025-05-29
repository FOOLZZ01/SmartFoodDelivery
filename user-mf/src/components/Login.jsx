import React, { useState } from "react";
import { login } from "../services/userApi";
import { toast } from "react-toastify";

export default function Login({ onLoggedIn }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handle = async () => {
    try {
      const res = await login(form);
      const { token } = res.data;
      if (!token) throw new Error("Manjka žeton");
      onLoggedIn(token, form.email.split("@")[0]); // začasno ime
    } catch (error) {
      console.error("❌ Napaka pri prijavi:", error);
      toast.error(
        `Napaka pri prijavi: ${error?.response?.data?.error || error.message}`
      );
    }
  };

  return (
    <div>
      <h4>Login</h4>
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handle}>Login</button>
    </div>
  );
}
