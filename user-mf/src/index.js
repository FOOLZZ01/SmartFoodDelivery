import React           from "react";
import ReactDOM        from "react-dom/client";
import App             from "./App";
import "./index.css";      // če imaš kak styling

// Ta koda poskrbi, da se ob zagonu
// remote lahko tehta tudi samostojno (http://localhost:3003)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
