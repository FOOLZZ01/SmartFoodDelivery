import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Dobrodošli v nadzorni plošči!</h2>
      <button onClick={handleLogout}>Odjava</button>
    </div>
  );
};

export default Dashboard;
