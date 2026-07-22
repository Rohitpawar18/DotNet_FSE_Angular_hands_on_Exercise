import styles from "./CohortDetails.module.css";

function CohortDetails() {
  const cohorts = [
    {
      id: 1,
      name: "React Basics",
      status: "ongoing",
      instructor: "John Smith",
      startDate: "Jan 2024",
      students: 25,
    },
    {
      id: 2,
      name: "Advanced React",
      status: "completed",
      instructor: "Jane Doe",
      startDate: "Dec 2023",
      students: 20,
    },
    {
      id: 3,
      name: "React Hooks",
      status: "ongoing",
      instructor: "Mike Johnson",
      startDate: "Feb 2024",
      students: 30,
    },
    {
      id: 4,
      name: "React State Management",
      status: "completed",
      instructor: "Sarah Wilson",
      startDate: "Nov 2023",
      students: 22,
    },
    {
      id: 5,
      name: "React Forms",
      status: "ongoing",
      instructor: "Tom Brown",
      startDate: "Mar 2024",
      students: 28,
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>
        📚 Academy Cohorts Dashboard
      </h1>

      <div style={{ textAlign: "center" }}>
        {cohorts.map((cohort) => (
          <div key={cohort.id} className={styles.box}>
            <h3
              style={{
                color: cohort.status === "ongoing" ? "green" : "blue",
                marginTop: 0,
                marginBottom: "15px",
              }}
            >
              {cohort.name}
            </h3>

            <dl>
              <dt>Status:</dt>
              <dd>
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    backgroundColor:
                      cohort.status === "ongoing" ? "#d4edda" : "#d1ecf1",
                    color: cohort.status === "ongoing" ? "#155724" : "#0c5460",
                    fontWeight: "bold",
                  }}
                >
                  {cohort.status.charAt(0).toUpperCase() +
                    cohort.status.slice(1)}
                </span>
              </dd>

              <dt>Instructor:</dt>
              <dd>{cohort.instructor}</dd>

              <dt>Start Date:</dt>
              <dd>{cohort.startDate}</dd>

              <dt>Students:</dt>
              <dd>{cohort.students}</dd>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CohortDetails;
