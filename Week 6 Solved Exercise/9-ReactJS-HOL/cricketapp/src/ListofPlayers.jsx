function ListofPlayers() {
  // ES6: Array of players with names and scores
  const players = [
    { id: 1, name: "Virat Kohli", score: 95 },
    { id: 2, name: "Rohit Sharma", score: 82 },
    { id: 3, name: "KL Rahul", score: 68 },
    { id: 4, name: "Suryakumar Yadav", score: 78 },
    { id: 5, name: "Hardik Pandya", score: 65 },
    { id: 6, name: "Rishabh Pant", score: 88 },
    { id: 7, name: "Shubman Gill", score: 72 },
    { id: 8, name: "Ishan Kishan", score: 55 },
    { id: 9, name: "Axar Patel", score: 76 },
    { id: 10, name: "Bumrah", score: 45 },
    { id: 11, name: "Siraj", score: 62 },
  ];

  // ES6: Arrow function to filter players with scores below 70
  const lowScorers = players.filter((player) => player.score < 70);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#1a5490" }}>
        🏏 List of Players
      </h1>

      {/* Display all players using ES6 map() */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ color: "#2c3e50", marginTop: "30px" }}>
          All Players (11)
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          {players.map((player) => (
            <div
              key={player.id}
              style={{
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                borderLeft: "4px solid #1a5490",
              }}
            >
              <h3 style={{ color: "#1a5490", marginTop: 0 }}>
                {player.id}. {player.name}
              </h3>
              <p style={{ color: "#666", fontSize: "16px" }}>
                <strong>Score:</strong> {player.score}
              </p>
            </div>
          ))}
        </div>

        {/* Display players with scores below 70 using arrow function filter */}
        <h2 style={{ color: "#e74c3c", marginTop: "40px" }}>
          Players with Score Below 70
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          {lowScorers.length > 0 ? (
            lowScorers.map((player) => (
              <div
                key={player.id}
                style={{
                  backgroundColor: "#ffe6e6",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  borderLeft: "4px solid #e74c3c",
                }}
              >
                <h3 style={{ color: "#e74c3c", marginTop: 0 }}>
                  {player.id}. {player.name}
                </h3>
                <p style={{ color: "#c0392b", fontSize: "16px" }}>
                  <strong>Score:</strong> {player.score} ⚠️
                </p>
              </div>
            ))
          ) : (
            <p>No players below 70</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListofPlayers;
