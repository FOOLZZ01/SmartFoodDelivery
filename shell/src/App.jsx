import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";

const UserApp       = lazy(() => import("user_mf/UserApp"));
const RestaurantApp = lazy(() => import("restaurant_mf/RestaurantApp"));

export default function App() {
  return (
    <div style={{ fontFamily: "Segoe UI" }}>
      <Nav />

      <Suspense fallback={<div style={{ padding: 20 }}>Loading…</div>}>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/user"       element={<UserApp />} />
          <Route path="/restaurant" element={<RestaurantApp />} />
        </Routes>
      </Suspense>
    </div>
  );
}
