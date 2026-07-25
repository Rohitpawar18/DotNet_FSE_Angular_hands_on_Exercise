import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // Method 1: Increment counter
  const incrementCounter = () => {
    setCount(count + 1);
  };

  // Method 2: Say Hello with static message
  const sayHello = () => {
    alert("Hello! Welcome to React Event Handling");
  };

  // Combined handler for Increment button - calls multiple methods
  const handleIncrement = () => {
    incrementCounter();
    sayHello();
  };

  // Method 3: Decrement counter
  const decrementCounter = () => {
    setCount(count - 1);
  };

  // Method 4: Say Welcome with argument
  const sayWelcome = (message) => {
    alert(`Welcome: ${message}`);
  };

  // Method 5: Synthetic event handler - OnPress
  const handleOnPress = (e) => {
    console.log("Synthetic Event:", e);
    alert("I was clicked - Synthetic Event Triggered!");
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        padding: "30px",
        borderRadius: "10px",
        maxWidth: "600px",
        margin: "20px auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#1a5490", textAlign: "center" }}>
        🔢 Counter Events Handler
      </h2>

      {/* Counter Display */}
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          marginBottom: "20px",
          border: "2px solid #1a5490",
        }}
      >
        <h3 style={{ margin: 0, color: "#2c3e50" }}>Current Count:</h3>
        <p
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: count >= 0 ? "#27ae60" : "#e74c3c",
            margin: "10px 0",
          }}
        >
          {count}
        </p>
      </div>

      {/* Button Container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {/* Increment Button - Calls multiple methods */}
        <button
          onClick={handleIncrement}
          style={{
            padding: "12px",
            fontSize: "14px",
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#229954")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#27ae60")}
        >
          ⬆️ Increment + Hello
        </button>

        {/* Decrement Button */}
        <button
          onClick={decrementCounter}
          style={{
            padding: "12px",
            fontSize: "14px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#c0392b")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#e74c3c")}
        >
          ⬇️ Decrement
        </button>
      </div>

      {/* Say Welcome Button with Argument */}
      <div style={{ marginBottom: "15px" }}>
        <button
          onClick={() => sayWelcome("Welcome to React!")}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "14px",
            backgroundColor: "#2980b9",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#1f618d")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2980b9")}
        >
          💬 Say Welcome
        </button>
      </div>

      {/* Synthetic Event Handler - OnPress */}
      <div>
        <button
          onPress={handleOnPress}
          onClick={handleOnPress}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "14px",
            backgroundColor: "#8e44ad",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#7d3c98")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#8e44ad")}
        >
          🖱️ Synthetic Event (OnPress)
        </button>
      </div>

      {/* Event Info */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#ecf0f1",
          borderRadius: "5px",
          fontSize: "12px",
          color: "#34495e",
        }}
      >
        <strong>📌 Events Handled:</strong>
        <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
          <li>✅ onClick - Increment (multiple methods)</li>
          <li>✅ onClick - Decrement</li>
          <li>✅ onClick - Say Welcome (with argument)</li>
          <li>✅ onClick - Synthetic Event</li>
          <li>✅ onMouseEnter - Hover effect</li>
          <li>✅ onMouseLeave - Hover effect</li>
        </ul>
      </div>
    </div>
  );
}

export default Counter;
