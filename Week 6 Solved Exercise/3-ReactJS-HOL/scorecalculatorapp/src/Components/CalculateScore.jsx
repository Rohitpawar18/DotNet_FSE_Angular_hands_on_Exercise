function CalculateScore({ name, school, total, goal }) {
  const avg = total / 4;
  const status = avg >= goal ? "Pass" : "Fail";

  return (
    <div className="score-card">
      <h2>Student Score Report</h2>
      <p>
        <strong>Name:</strong>
        {name}
      </p>
      <p>
        <strong>School:</strong>
        {school}
      </p>
      <p>
        <strong>Total Marks:</strong>
        {total}
      </p>
      <p>
        <strong>Goal:</strong>
        {goal}
      </p>
      <p>
        <strong>Average Score:</strong>
        {avg.toFixed(2)}
      </p>
      <p>
        <strong>Status:</strong>
        <span className={status.toLowerCase()}>{status}</span>
      </p>
    </div>
  );
}

export default CalculateScore;
