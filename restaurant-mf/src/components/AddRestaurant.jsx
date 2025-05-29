import React, { useState } from "react";
import { addRestaurant } from "../api";

export default function AddRestaurant() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleAdd = async () => {
    if (!name || !location) return alert("Polja ne smejo biti prazna!");
    try {
      await addRestaurant({ name, location });
      alert("✅ Restavracija dodana!");
      setName("");
      setLocation("");
    } catch {
      alert("❌ Napaka pri dodajanju restavracije");
    }
  };

  return (
    <div>
      <h4>Dodaj restavracijo</h4>
      <input placeholder="Ime" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Lokacija" value={location} onChange={(e) => setLocation(e.target.value)} />
      <button onClick={handleAdd}>Dodaj</button>
    </div>
  );
}
