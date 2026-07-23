import { useState } from "react";
import GuestPage from "./GuestPage";
import UserPage from "./UserPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle Login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {/* Navigation Header */}
      <div
        style={{
          backgroundColor: "#1a5490",
          color: "white",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: "0", fontSize: "24px" }}>
          ✈️ Flight Ticket Booking System
        </h1>

        {/* Login/Logout Button */}
        <button
          onClick={isLoggedIn ? handleLogout : handleLogin}
          style={{
            padding: "10px 20px",
            fontSize: "14px",
            backgroundColor: isLoggedIn ? "#e74c3c" : "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = isLoggedIn ? "#c0392b" : "#229954";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = isLoggedIn ? "#e74c3c" : "#27ae60";
          }}
        >
          {isLoggedIn ? "🚪 Logout" : "🔓 Login"}
        </button>
      </div>

      {/* Conditional Rendering - Based on Login State */}
      {isLoggedIn ? <UserPage /> : <GuestPage />}
    </div>
  );
}

export default App;
