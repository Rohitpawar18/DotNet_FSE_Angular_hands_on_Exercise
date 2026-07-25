function IndianPlayers() {
  // ES6: Two arrays of players
  const T20players = [
    { id: 1, name: "Virat Kohli", type: "Batsman" },
    { id: 2, name: "Rohit Sharma", type: "Batsman" },
    { id: 3, name: "Hardik Pandya", type: "All-rounder" },
  ];

  const RanjiTrophyPlayers = [
    { id: 4, name: "Cheteshwar Pujara", type: "Batsman" },
    { id: 5, name: "Ajinkya Rahane", type: "Batsman" },
    { id: 6, name: "Ishant Sharma", type: "Bowler" },
  ];

  // ES6: Merge arrays using spread operator
  const allPlayers = [...T20players, ...RanjiTrophyPlayers];

  // ES6: Destructuring - separate odd and even ID players
  const oddTeam = allPlayers.filter((player) => player.id % 2 !== 0);
  const evenTeam = allPlayers.filter((player) => player.id % 2 === 0);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#27ae60" }}>
        🇮🇳 Indian Players Teams
      </h1>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Display T20 Players */}
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              color: "#2980b9",
              borderBottom: "3px solid #2980b9",
              paddingBottom: "10px",
            }}
          >
            T20 Players ({T20players.length})
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px",
            }}
          >
            {T20players.map((player) => (
              <div
                key={player.id}
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  borderTop: "4px solid #2980b9",
                }}
              >
                <h3 style={{ color: "#2980b9", marginTop: 0 }}>
                  {player.name}
                </h3>
                <p style={{ color: "#666" }}>
                  <strong>Role:</strong> {player.type}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Display Ranji Trophy Players */}
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              color: "#e67e22",
              borderBottom: "3px solid #e67e22",
              paddingBottom: "10px",
            }}
          >
            Ranji Trophy Players ({RanjiTrophyPlayers.length})
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px",
            }}
          >
            {RanjiTrophyPlayers.map((player) => (
              <div
                key={player.id}
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  borderTop: "4px solid #e67e22",
                }}
              >
                <h3 style={{ color: "#e67e22", marginTop: 0 }}>
                  {player.name}
                </h3>
                <p style={{ color: "#666" }}>
                  <strong>Role:</strong> {player.type}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Display Merged Players - Odd Team (using destructuring) */}
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              color: "#c0392b",
              borderBottom: "3px solid #c0392b",
              paddingBottom: "10px",
            }}
          >
            🔴 Odd Team (ID: 1, 3, 5) - {oddTeam.length} Players
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px",
            }}
          >
            {oddTeam.map(({ id, name, type }) => (
              <div
                key={id}
                style={{
                  backgroundColor: "#ffe6e6",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  borderTop: "4px solid #c0392b",
                }}
              >
                <h3 style={{ color: "#c0392b", marginTop: 0 }}>
                  Player #{id}: {name}
                </h3>
                <p style={{ color: "#922b21" }}>
                  <strong>Role:</strong> {type}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Display Merged Players - Even Team (using destructuring) */}
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              color: "#27ae60",
              borderBottom: "3px solid #27ae60",
              paddingBottom: "10px",
            }}
          >
            🟢 Even Team (ID: 2, 4, 6) - {evenTeam.length} Players
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px",
            }}
          >
            {evenTeam.map(({ id, name, type }) => (
              <div
                key={id}
                style={{
                  backgroundColor: "#e6ffe6",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  borderTop: "4px solid #27ae60",
                }}
              >
                <h3 style={{ color: "#27ae60", marginTop: 0 }}>
                  Player #{id}: {name}
                </h3>
                <p style={{ color: "#1e8449" }}>
                  <strong>Role:</strong> {type}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Display all merged players */}
        <div>
          <h2
            style={{
              color: "#8e44ad",
              borderBottom: "3px solid #8e44ad",
              paddingBottom: "10px",
            }}
          >
            ⭐ All Players Combined ({allPlayers.length} Total)
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px",
            }}
          >
            {allPlayers.map(({ id, name, type }) => (
              <div
                key={id}
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  borderTop: "4px solid #8e44ad",
                }}
              >
                <h3 style={{ color: "#8e44ad", marginTop: 0 }}>{name}</h3>
                <p style={{ color: "#666" }}>
                  <strong>ID:</strong> {id} | <strong>Role:</strong> {type}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndianPlayers;
