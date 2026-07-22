import CalculateScore from "./Components/CalculateScore";
import "./Stylesheets/mystyle.css";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>
        Student Score Calculator
      </h1>

      <CalculateScore
        name="John Deo"
        school="Oxford High School"
        total="320"
        goal="75"
      />

      <CalculateScore
        name="Jane Smith"
        school="Cambridge Academy"
        total="280"
        goal="70"
      />

      <CalculateScore
        name="Mike Johnson"
        school="Stanford Institute"
        total="60"
        goal="80"
      />
    </div>
  );
}

export default App;
