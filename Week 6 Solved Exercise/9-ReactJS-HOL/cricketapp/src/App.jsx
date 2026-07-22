import { useState } from "react";
import ListofPlayers from "./ListofPlayers";
import IndianPlayers from "./IndianPlayers";

function App() {
  // ES6: State using flag to toggle between components
  const [flag, setFlag] = useState(true);

  return (
    <div>
      {/* Toggle Button */}
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#333",
          padding: "15px",
          textAlign: "center",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => setFlag(true)}
          style={{
            padding: "10px 20px",
            margin: "0 10px",
            fontSize: "16px",
            backgroundColor: flag ? "#2980b9" : "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📊 List of Players
        </button>

        <button
          onClick={() => setFlag(false)}
          style={{
            padding: "10px 20px",
            margin: "0 10px",
            fontSize: "16px",
            backgroundColor: !flag ? "#27ae60" : "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🇮🇳 Indian Players
        </button>
      </div>

      {/* Display component based on flag */}
      {flag ? <ListofPlayers /> : <IndianPlayers />}
    </div>
  );
}

export default App;
