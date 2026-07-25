import React from "react";
import Post from "./Post";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      error: null,
    };
  }

  loadPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);

        // Check if data is an array
        if (Array.isArray(data)) {
          const posts = data
            .slice(0, 10)
            .map(
              (post) => new Post(post.userId, post.id, post.title, post.body),
            );
          this.setState({ posts, loading: false });
        } else {
          throw new Error("Data is not an array");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        this.setState({ error: error.message, loading: false });
      });
  }

  componentDidMount() {
    console.log("Component mounted - Loading posts...");
    this.loadPosts();
  }

  componentDidCatch(error, errorInfo) {
    alert(`Error caught: ${error.message}`);
    console.error("Error Details:", errorInfo);
    this.setState({ error: error.message });
  }

  render() {
    const { posts, loading, error } = this.state;

    if (loading) {
      return (
        <div style={{ textAlign: "center", padding: "20px", fontSize: "18px" }}>
          ⏳ Loading posts...
        </div>
      );
    }

    if (error) {
      return (
        <div style={{ color: "red", padding: "20px", fontSize: "18px" }}>
          ❌ Error: {error}
        </div>
      );
    }

    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#333" }}>
          📚 Blog Posts ({posts.length})
        </h1>

        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              style={{
                backgroundColor: "white",
                padding: "15px",
                margin: "15px auto",
                maxWidth: "600px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                borderLeft: "4px solid #007bff",
              }}
            >
              <h3 style={{ color: "#007bff", marginTop: 0 }}>
                Post #{post.id} - User {post.userId}
              </h3>
              <h4 style={{ color: "#333" }}>{post.title}</h4>
              <p style={{ color: "#666", lineHeight: "1.6" }}>{post.body}</p>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            No posts available
          </div>
        )}
      </div>
    );
  }
}

export default Posts;
