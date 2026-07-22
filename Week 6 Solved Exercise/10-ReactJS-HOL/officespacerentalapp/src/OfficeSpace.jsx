import FeaturedOffice from "../src/assets/FeaturedOffice.jpg";

function OfficeSpace() {
  const singleOffice = {
    id: 1,
    name: "Premium Tower Suite",
    rent: 75000,
    address: "123 Business Park, Downtown",
    image: FeaturedOffice,
  };

  // List of office objects with matched images
  const officeSpaces = [
    {
      id: 1,
      name: "Executive Business Suite",
      rent: 85000,
      address: "123 Business Park, Downtown, City Center",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Startup Hub Office",
      rent: 45000,
      address: "456 Innovation Lane, Tech Park",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Corporate Headquarters",
      rent: 125000,
      address: "789 Enterprise Boulevard, Premium District",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      name: "Modern Creative Studio",
      rent: 95000,
      address: "654 Creative Way, Arts Quarter",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    },
  ];

  const getRentStyle = (rent) => {
    return {
      color: rent < 60000 ? "red" : "green",
      fontSize: "20px",
      fontWeight: "bold",
    };
  };

  const pageStyle = {
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
    padding: "20px",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#1a5490",
    marginBottom: "30px",
    fontSize: "36px",
    fontWeight: "bold",
  };

  const singleOfficeStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    margin: "0 auto 40px",
    border: "2px solid #1a5490",
  };

  const officeCardStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    transition: "transform 0.3s",
    border: "1px solid #e0e0e0",
  };

  const imageStyle = {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "15px",
  };

  const titleStyle = {
    color: "#2c3e50",
    marginTop: "0",
    marginBottom: "10px",
    fontSize: "22px",
  };

  const addressStyle = {
    color: "#7f8c8d",
    marginBottom: "10px",
    fontSize: "14px",
  };

  const listContainerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "20px",
  };

  return (
    <div style={pageStyle}>
      {/* Heading - JSX Element */}
      <h1 style={headingStyle}>🏢 Office Space Rental Portal</h1>

      {/* Single Office Display - Using JSX */}
      <div style={singleOfficeStyle}>
        <h2 style={{ color: "#1a5490", textAlign: "center" }}>
          Featured Office
        </h2>
        <img
          src={singleOffice.image}
          alt={singleOffice.name}
          style={imageStyle}
        />
        <h3 style={titleStyle}>{singleOffice.name}</h3>
        <p style={addressStyle}>
          <strong>📍 Address:</strong> {singleOffice.address}
        </p>
        <p style={getRentStyle(singleOffice.rent)}>
          <strong>💰 Rent:</strong> ₹{singleOffice.rent.toLocaleString()} per
          month
        </p>
      </div>

      {/* List of Office Spaces - JSX with map() and loop */}
      <div style={listContainerStyle}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>
          Available Office Spaces ({officeSpaces.length})
        </h2>

        <div style={gridStyle}>
          {/* Loop through office spaces using map() */}
          {officeSpaces.map((office) => (
            <div key={office.id} style={officeCardStyle}>
              {/* Image Attribute - JSX */}
              <img src={office.image} alt={office.name} style={imageStyle} />

              {/* Office Details - JSX Elements */}
              <h3 style={titleStyle}>{office.name}</h3>

              <p style={addressStyle}>
                <strong>📍 Address:</strong>
                <br />
                {office.address}
              </p>

              {/* Conditional Inline CSS - Red if < 60000, Green if > 60000 */}
              <p style={getRentStyle(office.rent)}>
                <strong>💰 Monthly Rent:</strong> ₹
                {office.rent.toLocaleString()}
              </p>

              {/* Status Badge */}
              <div
                style={{
                  display: "inline-block",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  backgroundColor: office.rent < 60000 ? "#ffebee" : "#e8f5e9",
                  color: office.rent < 60000 ? "#c62828" : "#2e7d32",
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                {office.rent < 60000 ? "🔴 Budget Friendly" : "🟢 Premium"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Statistics - JSX with calculation */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ color: "#1a5490", margin: 0 }}>Total Offices</h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#2c3e50",
              margin: 0,
            }}
          >
            {officeSpaces.length}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ color: "green", margin: 0 }}>Premium Offices</h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#2c3e50",
              margin: 0,
            }}
          >
            {officeSpaces.filter((o) => o.rent >= 60000).length}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ color: "red", margin: 0 }}>Budget Friendly</h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#2c3e50",
              margin: 0,
            }}
          >
            {officeSpaces.filter((o) => o.rent < 60000).length}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ color: "#1a5490", margin: 0 }}>Average Rent</h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#2c3e50",
              margin: 0,
            }}
          >
            ₹
            {Math.round(
              officeSpaces.reduce((sum, o) => sum + o.rent, 0) /
                officeSpaces.length,
            ).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OfficeSpace;
