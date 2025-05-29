import React, { useState } from "react";
import {
  getRestaurant,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "./api";

const Restaurants = () => {
  const [restaurantId, setRestaurantId] = useState("");
  const [restaurant, setRestaurant] = useState(null);
  const [newRestaurant, setNewRestaurant] = useState({ name: "", location: "" });

  const fetchRestaurant = async () => {
    try {
      const res = await getRestaurant(restaurantId);
      setRestaurant(res.data);
    } catch (err) {
      alert("Napaka pri pridobivanju restavracije.");
    }
  };

  const handleAdd = async () => {
    try {
      const res = await addRestaurant(newRestaurant);
      setRestaurant({ id: res.data.id, ...newRestaurant });
      alert("Restavracija uspešno dodana.");
      setNewRestaurant({ name: "", location: "" });
    } catch (err) {
      alert("Napaka pri dodajanju.");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateRestaurant(restaurant.id, restaurant);
      alert("Uspešno posodobljeno!");
    } catch {
      alert("Napaka pri posodabljanju.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRestaurant(restaurant.id);
      setRestaurant(null);
      setRestaurantId("");
      alert("Restavracija izbrisana.");
    } catch {
      alert("Napaka pri brisanju.");
    }
  };

  return (
    <div>
      <h3>Restavracija</h3>
      <input
        placeholder="ID restavracije"
        value={restaurantId}
        onChange={(e) => setRestaurantId(e.target.value)}
      />
      <button onClick={fetchRestaurant}>Pridobi podatke</button>

      {restaurant && (
        <div>
          <p>ID: {restaurant.id}</p>
          <input
            value={restaurant.name}
            onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
            placeholder="Ime"
          />
          <input
            value={restaurant.location}
            onChange={(e) => setRestaurant({ ...restaurant, location: e.target.value })}
            placeholder="Lokacija"
          />
          <button onClick={handleUpdate}>Uredi</button>
          <button onClick={handleDelete}>Izbriši</button>
        </div>
      )}

      <h4>Dodaj restavracijo</h4>
      <input
        placeholder="Ime"
        value={newRestaurant.name}
        onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
      />
      <input
        placeholder="Lokacija"
        value={newRestaurant.location}
        onChange={(e) => setNewRestaurant({ ...newRestaurant, location: e.target.value })}
      />
      <button onClick={handleAdd}>Dodaj</button>
    </div>
  );
};

export default Restaurants;
