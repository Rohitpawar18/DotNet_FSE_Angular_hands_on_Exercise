import { useState } from "react";

function UserPage() {
  const [bookedFlights, setBookedFlights] = useState([]);
  const [selectedFlights, setSelectedFlights] = useState(new Set());

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

  // Handle flight selection
  const handleSelectFlight = (flight) => {
    const newSelected = new Set(selectedFlights);
    if (newSelected.has(flight.id)) {
      newSelected.delete(flight.id);
    } else {
      newSelected.add(flight.id);
    }
    setSelectedFlights(newSelected);
  };

  // Book selected flights
  const handleBookFlight = () => {
    if (selectedFlights.size === 0) {
      alert("Please select at least one flight to book");
      return;
    }

    const booked = flights.filter((f) => selectedFlights.has(f.id));
    setBookedFlights([...bookedFlights, ...booked]);
    setSelectedFlights(new Set());
    alert(`Successfully booked ${booked.length} flight(s)!`);
  };

  // Cancel booking
  const handleCancelBooking = (index) => {
    const newBookings = bookedFlights.filter((_, i) => i !== index);
    setBookedFlights(newBookings);
    alert("Booking cancelled successfully!");
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        padding: "30px 20px",
      }}
    >
      {/* User Welcome Notice */}
      <div
        style={{
          backgroundColor: "#c8e6c9",
          border: "2px solid #27ae60",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "30px",
          maxWidth: "1200px",
          margin: "0 auto 30px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#1b5e20", margin: "0 0 10px 0" }}>
          👤 Logged In User
        </h2>
        <p style={{ color: "#1b5e20", margin: "0" }}>
          Welcome! You can now browse and book flights.
        </p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Available Flights Section */}
        <div style={{ marginBottom: "40px" }}>
          <h1
            style={{
              color: "#1a5490",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            ✈️ Available Flights (Delhi → Mumbai)
          </h1>

          {/* Flights Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
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
                  border: selectedFlights.has(flight.id)
                    ? "3px solid #27ae60"
                    : "2px solid #e0e0e0",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  backgroundColor: selectedFlights.has(flight.id)
                    ? "#f1f8f4"
                    : "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0,0,0,0.2)";
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
                      style={{
                        margin: "0",
                        color: "#7f8c8d",
                        fontSize: "12px",
                      }}
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

                {/* Select Flight Checkbox */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedFlights.has(flight.id)}
                    onChange={() => handleSelectFlight(flight)}
                    style={{
                      width: "18px",
                      height: "18px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  />
                  <span style={{ color: "#2c3e50", fontWeight: "bold" }}>
                    {selectedFlights.has(flight.id)
                      ? "✅ Selected"
                      : "Select to Book"}
                  </span>
                </label>
              </div>
            ))}
          </div>

          {/* Book Button */}
          {selectedFlights.size > 0 && (
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <button
                onClick={handleBookFlight}
                style={{
                  padding: "15px 30px",
                  fontSize: "16px",
                  backgroundColor: "#27ae60",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#229954")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#27ae60")
                }
              >
                ✈️ Book {selectedFlights.size} Flight(s)
              </button>
            </div>
          )}
        </div>

        {/* Booked Flights Section - Conditionally Render */}
        {bookedFlights.length > 0 && (
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              border: "2px solid #27ae60",
            }}
          >
            <h2
              style={{
                color: "#27ae60",
                marginTop: "0",
                marginBottom: "20px",
              }}
            >
              🎫 Your Booked Flights ({bookedFlights.length})
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "20px",
              }}
            >
              {bookedFlights.map((flight, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#f0f8f4",
                    borderRadius: "10px",
                    padding: "20px",
                    border: "2px solid #27ae60",
                  }}
                >
                  <h3
                    style={{
                      color: "#1b5e20",
                      marginTop: "0",
                      marginBottom: "15px",
                    }}
                  >
                    ✅ {flight.flightName}
                  </h3>

                  <p style={{ margin: "5px 0", color: "#2c3e50" }}>
                    <strong>📍 Route:</strong> {flight.from} → {flight.to}
                  </p>
                  <p style={{ margin: "5px 0", color: "#2c3e50" }}>
                    <strong>🕐 Time:</strong> {flight.departure} -{" "}
                    {flight.arrival}
                  </p>
                  <p style={{ margin: "5px 0", color: "#2c3e50" }}>
                    <strong>⏱️ Duration:</strong> {flight.duration}
                  </p>
                  <p
                    style={{
                      margin: "5px 0 15px 0",
                      color: "#27ae60",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    <strong>💰 Price:</strong> {flight.price}
                  </p>

                  <button
                    onClick={() => handleCancelBooking(index)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#c0392b")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#e74c3c")
                    }
                  >
                    ❌ Cancel Booking
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty Bookings Message */}
        {bookedFlights.length === 0 && (
          <div
            style={{
              backgroundColor: "#e3f2fd",
              border: "2px solid #2196f3",
              borderRadius: "8px",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#1565c0", marginTop: "0" }}>
              🎫 No Bookings Yet
            </h3>
            <p style={{ color: "#1565c0", marginBottom: "0" }}>
              Select flights above and click "Book" to confirm your booking!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;
