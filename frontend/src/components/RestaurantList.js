import React, { useEffect, useState } from "react";
import { getRestaurants } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; 

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error("Napaka pri nalaganju restavracij!", error);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div>
      <h2>Restavracije</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant._id} onClick={() => navigate(`/menu/${restaurant._id}`)}>
            {restaurant.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
