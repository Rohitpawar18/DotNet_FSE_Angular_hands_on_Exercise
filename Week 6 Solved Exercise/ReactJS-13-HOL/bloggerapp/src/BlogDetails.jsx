import { useState } from "react";

function BlogDetails() {
  const [activeCategory, setActiveCategory] = useState("all");

  const blogs = [
    {
      id: 1,
      title: "Getting Started with React",
      category: "tech",
      date: "Jan 15, 2024",
      views: 1250,
      author: "John Doe",
    },
    {
      id: 2,
      title: "10 Tips for Healthy Living",
      category: "health",
      date: "Jan 14, 2024",
      views: 890,
      author: "Sarah Smith",
    },
    {
      id: 3,
      title: "JavaScript ES6 Features Explained",
      category: "tech",
      date: "Jan 13, 2024",
      views: 2100,
      author: "Mike Johnson",
    },
    {
      id: 4,
      title: "Best Travel Destinations 2024",
      category: "travel",
      date: "Jan 12, 2024",
      views: 1560,
      author: "Emma Wilson",
    },
    {
      id: 5,
      title: "Meditation and Mental Health",
      category: "health",
      date: "Jan 11, 2024",
      views: 945,
      author: "Lisa Brown",
    },
    {
      id: 6,
      title: "Web Development Best Practices",
      category: "tech",
      date: "Jan 10, 2024",
      views: 1800,
      author: "Tom Davis",
    },
  ];

  // Filter blogs based on category
  const filteredBlogs =
    activeCategory === "all"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

  // Helper function for conditional rendering
  const getCategoryColor = (category) => {
    switch (category) {
      case "tech":
        return "#3498db";
      case "health":
        return "#27ae60";
      case "travel":
        return "#e74c3c";
      default:
        return "#95a5a6";
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "30px",
        border: "2px solid #e67e22",
      }}
    >
      <h2 style={{ color: "#e67e22", margin: "0 0 20px 0" }}>
        📝 Blog Details
      </h2>

      {/* Category Filter Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {["all", "tech", "health", "travel"].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            style={{
              padding: "8px 15px",
              backgroundColor:
                activeCategory === category ? "#e67e22" : "#bdc3c7",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "12px",
              transition: "background-color 0.3s",
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Conditional Rendering Method 1: Using If-Else (Element Variable) */}
      {filteredBlogs.length > 0 ? (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            {/* Using map() with key */}
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  border: `2px solid ${getCategoryColor(blog.category)}`,
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-3px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    marginBottom: "10px",
                  }}
                >
                  <h4
                    style={{
                      color: "#2c3e50",
                      margin: "0",
                      flex: 1,
                      fontSize: "15px",
                    }}
                  >
                    {blog.title}
                  </h4>
                  <span
                    style={{
                      backgroundColor: getCategoryColor(blog.category),
                      color: "white",
                      padding: "3px 8px",
                      borderRadius: "3px",
                      fontSize: "10px",
                      fontWeight: "bold",
                      marginLeft: "10px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {blog.category.toUpperCase()}
                  </span>
                </div>

                <p style={{ margin: "5px 0", color: "#666", fontSize: "12px" }}>
                  <strong>Author:</strong> {blog.author}
                </p>
                <p style={{ margin: "5px 0", color: "#666", fontSize: "12px" }}>
                  <strong>Date:</strong> {blog.date}
                </p>
                <p
                  style={{
                    margin: "10px 0 0 0",
                    color: "#e67e22",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  👁️ {blog.views} views
                </p>
              </div>
            ))}
          </div>

          {/* Conditional Rendering Method 2: AND Operator */}
          {filteredBlogs.length < blogs.length && (
            <div
              style={{
                textAlign: "center",
                color: "#7f8c8d",
                fontSize: "12px",
                marginTop: "10px",
              }}
            >
              Showing {filteredBlogs.length} of {blogs.length} blogs
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "30px",
            backgroundColor: "#ecf0f1",
            borderRadius: "8px",
            color: "#7f8c8d",
          }}
        >
          <p style={{ margin: "0" }}>📴 No blogs found in this category</p>
        </div>
      )}
    </div>
  );
}

export default BlogDetails;
