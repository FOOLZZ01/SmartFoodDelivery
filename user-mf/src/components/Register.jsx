import React, { useState } from "react";
import { register } from "../services/userApi";
import { toast } from "react-toastify";

export default function Register({ onRegistered }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handle = async () => {
    try {
      const res = await register(form);
      const { token } = res.data;
      if (!token) throw new Error("Manjka žeton");
      onRegistered(token, form.name);
    } catch (error) {
      console.error("❌ Napaka pri registraciji:", error);
      toast.error(
        `Napaka pri registraciji: ${error?.response?.data?.error || error.message}`
      );
    }
  };

  return (
    <div>
      <h4>Register</h4>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handle}>Register</button>
    </div>
  );
}
