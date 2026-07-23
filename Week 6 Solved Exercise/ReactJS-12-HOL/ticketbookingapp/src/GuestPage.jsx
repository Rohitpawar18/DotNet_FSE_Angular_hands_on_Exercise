function GuestPage() {
  const flights = [
    {
      id: 1,
      flightName: "Air India Express",
      from: "Delhi (DEL)",
      to: "Mumbai (BOM)",
      departure: "08:00 AM",
      arrival: "10:30 AM",
      duration: "2h 30m",
      price: "₹3,500",
    },
    {
      id: 2,
      flightName: "IndiGo",
      from: "Delhi (DEL)",
      to: "Mumbai (BOM)",
      departure: "10:15 AM",
      arrival: "01:00 PM",
      duration: "2h 45m",
      price: "₹4,200",
    },
    {
      id: 3,
      flightName: "Spice Jet",
      from: "Delhi (DEL)",
      to: "Mumbai (BOM)",
      departure: "12:30 PM",
      arrival: "03:15 PM",
      duration: "2h 45m",
      price: "₹3,800",
    },
    {
      id: 4,
      flightName: "Vistara",
      from: "Delhi (DEL)",
      to: "Mumbai (BOM)",
      departure: "02:45 PM",
      arrival: "05:30 PM",
      duration: "2h 45m",
      price: "₹5,500",
    },
    {
      id: 5,
      flightName: "Go Air",
      from: "Delhi (DEL)",
      to: "Mumbai (BOM)",
      departure: "04:20 PM",
      arrival: "07:00 PM",
      duration: "2h 40m",
      price: "₹3,200",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        padding: "30px 20px",
      }}
    >
      {/* Guest Notice */}
      <div
        style={{
          backgroundColor: "#fff3cd",
          border: "2px solid #ffc107",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "30px",
          maxWidth: "1200px",
          margin: "0 auto 30px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#856404", margin: "0 0 10px 0" }}>
          👤 Guest User Mode
        </h2>
        <p style={{ color: "#856404", margin: "0" }}>
          You are browsing as a guest. Please login to book tickets!
        </p>
      </div>

      {/* Flights Heading */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{
            color: "#1a5490",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          ✈️ Available Flights (Delhi → Mumbai)
        </h1>

        {/* Flights List */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "20px",
          }}
        >
          {flights.map((flight) => (
            <div
              key={flight.id}
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                border: "2px solid #e0e0e0",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
              }}
            >
              {/* Flight Name */}
              <h3
                style={{
                  color: "#1a5490",
                  marginTop: "0",
                  marginBottom: "15px",
                  fontSize: "18px",
                }}
              >
                ✈️ {flight.flightName}
              </h3>

              {/* Route */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                  padding: "15px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                }}
              >
                <div style={{ textAlign: "center", flex: 1 }}>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#2c3e50",
                    }}
                  >
                    {flight.departure}
                  </p>
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      fontSize: "12px",
                      color: "#7f8c8d",
                    }}
                  >
                    {flight.from}
                  </p>
                </div>

                <div
                  style={{
                    flex: "0.5",
                    textAlign: "center",
                    margin: "0 10px",
                  }}
                >
                  <p
                    style={{ margin: "0", color: "#7f8c8d", fontSize: "12px" }}
                  >
                    {flight.duration}
                  </p>
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      color: "#7f8c8d",
                      fontSize: "12px",
                    }}
                  >
                    ✈️
                  </p>
                </div>

                <div style={{ textAlign: "center", flex: 1 }}>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#2c3e50",
                    }}
                  >
                    {flight.arrival}
                  </p>
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      fontSize: "12px",
                      color: "#7f8c8d",
                    }}
                  >
                    {flight.to}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div
                style={{
                  backgroundColor: "#e8f5e9",
                  padding: "10px",
                  borderRadius: "8px",
                  textAlign: "center",
                  marginBottom: "15px",
                }}
              >
                <p
                  style={{
                    margin: "0",
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#27ae60",
                  }}
                >
                  {flight.price}
                </p>
              </div>

              {/* Booking Button - Disabled for guests */}
              <button
                disabled
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#95a5a6",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "not-allowed",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                🔒 Login to Book
              </button>
            </div>
          ))}
        </div>

        {/* Guest Notice */}
        <div
          style={{
            marginTop: "40px",
            backgroundColor: "#e3f2fd",
            border: "2px solid #2196f3",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#1565c0", marginTop: "0" }}>💡 Notice</h3>
          <p style={{ color: "#1565c0", marginBottom: "0" }}>
            To book a ticket, please login to your account. Login button is
            available in the top navigation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GuestPage;
