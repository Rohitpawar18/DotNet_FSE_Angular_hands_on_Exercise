import { useState } from "react";

function CurrencyConvertor() {
  const [inr, setInr] = useState("");
  const [eur, setEur] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [conversionType, setConversionType] = useState("inrToEur");

  // Exchange rates (approximate)
  const INR_TO_EUR = 0.012; // 1 INR = 0.012 EUR
  const EUR_TO_INR = 83.33; // 1 EUR = 83.33 INR

  // Handle INR input change
  const handleInrChange = (e) => {
    const value = e.target.value;
    setInr(value);
  };

  // Handle EUR input change
  const handleEurChange = (e) => {
    const value = e.target.value;
    setEur(value);
  };

  // Convert INR to EUR
  const convertInrToEur = () => {
    if (inr === "" || isNaN(inr)) {
      alert("Please enter a valid amount in INR");
      return;
    }
    const eurAmount = (parseFloat(inr) * INR_TO_EUR).toFixed(2);
    setEur(eurAmount);
    setConvertedAmount({
      from: `₹${parseFloat(inr).toLocaleString("en-IN")}`,
      to: `€${eurAmount}`,
      message: `₹${parseFloat(inr).toLocaleString("en-IN")} INR = €${eurAmount} EUR`,
    });
    setConversionType("inrToEur");
  };

  // Convert EUR to INR
  const convertEurToInr = () => {
    if (eur === "" || isNaN(eur)) {
      alert("Please enter a valid amount in EUR");
      return;
    }
    const inrAmount = (parseFloat(eur) * EUR_TO_INR).toFixed(2);
    setInr(inrAmount);
    setConvertedAmount({
      from: `€${parseFloat(eur).toLocaleString()}`,
      to: `₹${inrAmount}`,
      message: `€${parseFloat(eur).toLocaleString()} EUR = ₹${inrAmount} INR`,
    });
    setConversionType("eurToInr");
  };

  // Reset all values
  const handleReset = () => {
    setInr("");
    setEur("");
    setConvertedAmount(null);
  };

  // Synthetic event handler with console log
  const handleSubmit = (e) => {
    console.log("Synthetic Event Object:", e);
    console.log("Event Type:", e.type);
    console.log("Target:", e.target);
    if (conversionType === "inrToEur") {
      convertInrToEur();
    } else {
      convertEurToInr();
    }
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
        💱 Currency Convertor (INR ↔ EUR)
      </h2>

      {/* Input Section */}
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        {/* INR Input */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#2c3e50",
            }}
          >
            Indian Rupees (INR) 🇮🇳
          </label>
          <input
            type="number"
            placeholder="Enter amount in INR"
            value={inr}
            onChange={handleInrChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "2px solid #bdc3c7",
              fontSize: "14px",
              boxSizing: "border-box",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#27ae60")}
            onBlur={(e) => (e.target.style.borderColor = "#bdc3c7")}
          />
        </div>

        {/* EUR Input */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#2c3e50",
            }}
          >
            Euro (EUR) 🇪🇺
          </label>
          <input
            type="number"
            placeholder="Enter amount in EUR"
            value={eur}
            onChange={handleEurChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "2px solid #bdc3c7",
              fontSize: "14px",
              boxSizing: "border-box",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2980b9")}
            onBlur={(e) => (e.target.style.borderColor = "#bdc3c7")}
          />
        </div>
      </div>

      {/* Buttons Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        {/* Convert INR to EUR */}
        <button
          onClick={() => {
            setConversionType("inrToEur");
            convertInrToEur();
          }}
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
          ₹ → €
        </button>

        {/* Convert EUR to INR */}
        <button
          onClick={() => {
            setConversionType("eurToInr");
            convertEurToInr();
          }}
          style={{
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
          € → ₹
        </button>
      </div>

      {/* Synthetic Event Handler Button */}
      <div style={{ marginBottom: "15px" }}>
        <button
          onClick={handleSubmit}
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
          🖱️ Convert (Synthetic Event)
        </button>
      </div>

      {/* Reset Button */}
      <div style={{ marginBottom: "15px" }}>
        <button
          onClick={handleReset}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "14px",
            backgroundColor: "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#7f8c8d")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#95a5a6")}
        >
          🔄 Reset
        </button>
      </div>

      {/* Conversion Result Display */}
      {convertedAmount && (
        <div
          style={{
            backgroundColor: "#e8f5e9",
            padding: "15px",
            borderRadius: "8px",
            border: "2px solid #27ae60",
            marginBottom: "15px",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#27ae60" }}>
            ✅ Conversion Result
          </h3>
          <p style={{ margin: "5px 0", color: "#2c3e50", fontSize: "16px" }}>
            <strong>{convertedAmount.message}</strong>
          </p>
          <p style={{ margin: "5px 0", fontSize: "12px", color: "#666" }}>
            Exchange Rate:{" "}
            {conversionType === "inrToEur"
              ? `1 INR = ${INR_TO_EUR} EUR`
              : `1 EUR = ${EUR_TO_INR} INR`}
          </p>
        </div>
      )}

      {/* Event Information */}
      <div
        style={{
          padding: "15px",
          backgroundColor: "#ecf0f1",
          borderRadius: "5px",
          fontSize: "12px",
          color: "#34495e",
        }}
      >
        <strong>📌 Events Handled:</strong>
        <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
          <li>✅ onChange - Input field changes</li>
          <li>✅ onClick - Convert & Reset buttons</li>
          <li>✅ onFocus - Input focus effect</li>
          <li>✅ onBlur - Input blur effect</li>
          <li>✅ onMouseEnter - Hover effect</li>
          <li>✅ onMouseLeave - Hover effect</li>
          <li>✅ Synthetic Events - Full event object logged</li>
        </ul>
      </div>
    </div>
  );
}

export default CurrencyConvertor;
