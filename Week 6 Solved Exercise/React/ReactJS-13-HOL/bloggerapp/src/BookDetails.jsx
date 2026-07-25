import { useState } from "react";

function BookDetails() {
  const [showBooks, setShowBooks] = useState(true);

  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      rating: "★★★★★",
      year: 1925,
      genre: "Fiction",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      rating: "★★★★★",
      year: 1960,
      genre: "Fiction",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      rating: "★★★★☆",
      year: 1949,
      genre: "Dystopian",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      rating: "★★★★★",
      year: 1813,
      genre: "Romance",
    },
    {
      id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      rating: "★★★★☆",
      year: 1951,
      genre: "Fiction",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "30px",
        border: "2px solid #3498db",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#3498db", margin: "0" }}>📚 Book Details</h2>
        <button
          onClick={() => setShowBooks(!showBooks)}
          style={{
            padding: "8px 15px",
            backgroundColor: showBooks ? "#e74c3c" : "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "12px",
          }}
        >
          {showBooks ? "👁️ Hide" : "👁️ Show"}
        </button>
      </div>

      {/* Conditional Rendering Method 1: AND Operator */}
      {showBooks && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "15px",
          }}
        >
          {/* Using map() with key prop */}
          {books.map((book) => (
            <div
              key={book.id}
              style={{
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                border: "1px solid #e0e0e0",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-3px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <h4
                style={{
                  color: "#2c3e50",
                  margin: "0 0 10px 0",
                  fontSize: "16px",
                }}
              >
                📖 {book.title}
              </h4>
              <p style={{ margin: "5px 0", color: "#666", fontSize: "13px" }}>
                <strong>Author:</strong> {book.author}
              </p>
              <p style={{ margin: "5px 0", color: "#666", fontSize: "13px" }}>
                <strong>Genre:</strong> {book.genre}
              </p>
              <p
                style={{ margin: "5px 0", color: "#3498db", fontSize: "13px" }}
              >
                <strong>Year:</strong> {book.year}
              </p>
              <p
                style={{
                  margin: "10px 0 0 0",
                  color: "#f39c12",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {book.rating}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Conditional Rendering Method 2: Ternary Operator (Element Variable) */}
      {showBooks ? (
        <div
          style={{
            marginTop: "10px",
            textAlign: "center",
            color: "#27ae60",
            fontSize: "12px",
          }}
        >
          ✅ Showing {books.length} books
        </div>
      ) : (
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#e74c3c",
            fontSize: "14px",
          }}
        >
          📴 Books are hidden. Click Show to display!
        </div>
      )}
    </div>
  );
}

export default BookDetails;
