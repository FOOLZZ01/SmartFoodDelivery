import React, { useState } from "react";
import {
  getMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "./api";

const Menus = () => {
  const [restaurantId, setRestaurantId] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
  });

  const fetchMenu = async () => {
    try {
      const res = await getMenu(restaurantId);
      setMenuItems(res.data);
    } catch {
      alert("Napaka pri pridobivanju menija.");
    }
  };

  const handleAdd = async () => {
    try {
      await addMenuItem(restaurantId, newItem);
      fetchMenu();
      setNewItem({ name: "", description: "", price: "" });
    } catch {
      alert("Napaka pri dodajanju menija.");
    }
  };

  const handleUpdate = async (id, item) => {
    try {
      await updateMenuItem(id, item);
      fetchMenu();
    } catch {
      alert("Napaka pri posodabljanju menija.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMenuItem(id);
      fetchMenu();
    } catch {
      alert("Napaka pri brisanju menija.");
    }
  };

  return (
    <div>
      <h3>Meni</h3>
      <input
        placeholder="ID restavracije"
        value={restaurantId}
        onChange={(e) => setRestaurantId(e.target.value)}
      />
      <button onClick={fetchMenu}>Pridobi meni</button>

      {menuItems.map((item) => (
        <div key={item.menu_id}>
          <input
            value={item.name}
            onChange={(e) =>
              setMenuItems(menuItems.map((i) =>
                i.menu_id === item.menu_id ? { ...i, name: e.target.value } : i
              ))
            }
          />
          <input
            value={item.description}
            onChange={(e) =>
              setMenuItems(menuItems.map((i) =>
                i.menu_id === item.menu_id ? { ...i, description: e.target.value } : i
              ))
            }
          />
          <input
            type="number"
            value={item.price}
            onChange={(e) =>
              setMenuItems(menuItems.map((i) =>
                i.menu_id === item.menu_id ? { ...i, price: e.target.value } : i
              ))
            }
          />
          <button onClick={() => handleUpdate(item.menu_id, item)}>Uredi</button>
          <button onClick={() => handleDelete(item.menu_id)}>Izbriši</button>
        </div>
      ))}

      <h4>Dodaj nov meni</h4>
      <input
        placeholder="Ime"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        placeholder="Opis"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cena"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
      />
      <button onClick={handleAdd}>Dodaj meni</button>
    </div>
  );
};

export default Menus;
