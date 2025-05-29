import React, { useState } from "react";
import { addMenuItem } from "../api";

export default function AddMenuItem() {
  const [restaurantId, setRestaurantId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = async () => {
    if (!restaurantId || !name || !price) return alert("Polja ne smejo biti prazna!");
    try {
      await addMenuItem(restaurantId, {
        name,
        description,
        price: parseFloat(price),
      });
      alert("✅ Meni dodan!");
      setName("");
      setDescription("");
      setPrice("");
    } catch {
      alert("❌ Napaka pri dodajanju menija");
    }
  };

  return (
    <div>
      <h4>Dodaj meni</h4>
      <input placeholder="ID restavracije" value={restaurantId} onChange={(e) => setRestaurantId(e.target.value)} />
      <input placeholder="Ime" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Opis" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input placeholder="Cena" value={price} onChange={(e) => setPrice(e.target.value)} type="number" />
      <button onClick={handleAdd}>Dodaj meni</button>
    </div>
  );
}
