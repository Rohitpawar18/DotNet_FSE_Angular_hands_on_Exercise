import { useState } from "react";
import BookDetails from "./BookDetails";
import BlogDetails from "./BlogDetails";
import CourseDetails from "./CourseDetails";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("books");

  // Conditional rendering using switch statement
  const renderComponent = (tab) => {
    switch (tab) {
      case "books":
        return <BookDetails />;
      case "blogs":
        return <BlogDetails />;
      case "courses":
        return <CourseDetails />;
      default:
        return <BookDetails />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ecf0f1",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#2c3e50",
          color: "white",
          padding: "30px",
          borderRadius: "10px",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ margin: "0", fontSize: "32px" }}>📱 Blogger App</h1>
        <p style={{ margin: "10px 0 0 0", fontSize: "14px", color: "#bdc3c7" }}>
          Conditional Rendering | Map() Function | Component Keys | Multiple
          Rendering Methods
        </p>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        {[
          { id: "books", label: "📚 Books", color: "#3498db" },
          { id: "blogs", label: "📝 Blogs", color: "#e67e22" },
          { id: "courses", label: "🎓 Courses", color: "#9b59b6" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "12px 25px",
              fontSize: "14px",
              backgroundColor: activeTab === tab.id ? tab.color : "#bdc3c7",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.3s",
              transform: activeTab === tab.id ? "scale(1.05)" : "scale(1)",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.backgroundColor = "#95a5a6";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.backgroundColor = "#bdc3c7";
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content - Conditional Rendering using Switch */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {renderComponent(activeTab)}
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#34495e",
          color: "white",
          padding: "20px",
          textAlign: "center",
          marginTop: "40px",
          borderRadius: "10px",
          fontSize: "12px",
        }}
      >
        <p style={{ margin: "0" }}>
          🎓 Exercise 13 | Conditional Rendering Methods | Map() with Keys |
          Component Extraction
        </p>
        <p style={{ margin: "10px 0 0 0", color: "#bdc3c7" }}>
          Rendering Methods Used: Ternary (?:) | AND (&&) | Switch Statement |
          Element Variables
        </p>
      </div>
    </div>
  );
}

export default App;
