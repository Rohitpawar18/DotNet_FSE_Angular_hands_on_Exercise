import { useState } from "react";
import Counter from "./Counter";
import CurrencyConvertor from "./CurrencyConvertor";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("counter");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ecf0f1" }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: "#1a5490",
          color: "white",
          padding: "20px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>⚡ React Event Handling Examples</h1>
        <p style={{ margin: "10px 0 0 0", fontSize: "14px" }}>
          Learn onClick, onChange, onMouseEnter, onMouseLeave & Synthetic Events
        </p>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "20px",
          padding: "0 20px",
        }}
      >
        <button
          onClick={() => setActiveTab("counter")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: activeTab === "counter" ? "#27ae60" : "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
        >
          🔢 Counter Events
        </button>

        <button
          onClick={() => setActiveTab("currency")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: activeTab === "currency" ? "#2980b9" : "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
        >
          💱 Currency Convertor
        </button>
      </div>

      {/* Content */}
      {activeTab === "counter" ? <Counter /> : <CurrencyConvertor />}

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#34495e",
          color: "white",
          padding: "20px",
          textAlign: "center",
          marginTop: "30px",
          fontSize: "12px",
        }}
      >
        <p style={{ margin: 0 }}>
          🎓 React Events Mastery | Exercise 11 | Event Handling & Synthetic
          Events
        </p>
      </div>
    </div>
  );
}

export default App;
