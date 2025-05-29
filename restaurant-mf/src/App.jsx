import React from "react";
import Restaurants from "./components/Restaurants";
import Menus from "./components/Menus";

export default function App() {
  return (
    <div>
      <h1>🍽️ Restaurant Microfrontend</h1>
      <Restaurants />
      <Menus />
    </div>
  );
}
