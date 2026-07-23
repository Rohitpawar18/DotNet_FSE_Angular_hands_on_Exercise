import { useState } from "react";

function CourseDetails() {
  const [expandedCourse, setExpandedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      title: "React Fundamentals",
      instructor: "John Smith",
      level: "Beginner",
      duration: "4 weeks",
      students: 1250,
      rating: 4.8,
      price: "₹2,999",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Sarah Wilson",
      level: "Advanced",
      duration: "6 weeks",
      students: 890,
      rating: 4.9,
      price: "₹3,499",
    },
    {
      id: 3,
      title: "Web Design Masterclass",
      instructor: "Mike Johnson",
      level: "Intermediate",
      duration: "5 weeks",
      students: 2100,
      rating: 4.7,
      price: "₹2,499",
    },
    {
      id: 4,
      title: "Full Stack Development",
      instructor: "Emma Davis",
      level: "Advanced",
      duration: "8 weeks",
      students: 1560,
      rating: 4.9,
      price: "₹4,999",
    },
    {
      id: 5,
      title: "UI/UX Design Basics",
      instructor: "Lisa Brown",
      level: "Beginner",
      duration: "3 weeks",
      students: 945,
      rating: 4.6,
      price: "₹1,999",
    },
  ];

  // Helper function for level badge color
  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "#27ae60";
      case "Intermediate":
        return "#f39c12";
      case "Advanced":
        return "#e74c3c";
      default:
        return "#95a5a6";
    }
  };

  // Helper function for star rating display
  const renderStars = (rating) => {
    return "⭐".repeat(Math.round(rating));
  };

  // Element variable for expanded content
  const expandedContent = expandedCourse && (
    <div
      style={{
        backgroundColor: "#ecf0f1",
        padding: "15px",
        borderRadius: "8px",
        marginTop: "10px",
      }}
    >
      <p style={{ margin: "5px 0", color: "#2c3e50", fontSize: "13px" }}>
        <strong>📚 Level:</strong> {expandedCourse.level}
      </p>
      <p style={{ margin: "5px 0", color: "#2c3e50", fontSize: "13px" }}>
        <strong>⏱️ Duration:</strong> {expandedCourse.duration}
      </p>
      <p style={{ margin: "5px 0", color: "#2c3e50", fontSize: "13px" }}>
        <strong>👥 Students:</strong> {expandedCourse.students.toLocaleString()}
      </p>
      <p style={{ margin: "5px 0", color: "#2c3e50", fontSize: "13px" }}>
        <strong>💰 Price:</strong> {expandedCourse.price}
      </p>
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        border: "2px solid #9b59b6",
      }}
    >
      <h2 style={{ color: "#9b59b6", margin: "0 0 20px 0" }}>
        🎓 Course Details
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "15px",
        }}
      >
        {/* Using map() with key and conditional rendering inside */}
        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              backgroundColor: "white",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              border: "1px solid #e0e0e0",
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onClick={() =>
              setExpandedCourse(
                expandedCourse?.id === course.id ? null : course,
              )
            }
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
            }}
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
                {course.title}
              </h4>
              <span
                style={{
                  backgroundColor: getLevelColor(course.level),
                  color: "white",
                  padding: "3px 8px",
                  borderRadius: "3px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginLeft: "10px",
                  whiteSpace: "nowrap",
                }}
              >
                {course.level}
              </span>
            </div>

            <p style={{ margin: "5px 0", color: "#666", fontSize: "13px" }}>
              <strong>👨‍🏫 Instructor:</strong> {course.instructor}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
                paddingTop: "10px",
                borderTop: "1px solid #e0e0e0",
              }}
            >
              <span
                style={{
                  color: "#f39c12",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                {renderStars(course.rating)} {course.rating}
              </span>
              <span
                style={{
                  color: "#9b59b6",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {course.price}
              </span>
            </div>

            {/* Conditional Rendering Method: Element Variable */}
            {expandedCourse?.id === course.id && expandedContent}

            {/* Show expand indicator */}
            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
                color: "#7f8c8d",
                fontSize: "11px",
              }}
            >
              {expandedCourse?.id === course.id
                ? "▲ Click to hide details"
                : "▼ Click to see more"}
            </div>
          </div>
        ))}
      </div>

      {/* Conditional Rendering Method: AND Operator */}
      {courses.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#7f8c8d",
            fontSize: "12px",
          }}
        >
          📊 Showing {courses.length} courses | Total Students:{" "}
          {courses.reduce((sum, c) => sum + c.students, 0).toLocaleString()}
        </div>
      )}
    </div>
  );
}

export default CourseDetails;
