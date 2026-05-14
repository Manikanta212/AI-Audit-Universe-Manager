import { useState } from "react";
import "./App.css";

function App() {
  const [department, setDepartment] = useState("");
  const [risk, setRisk] = useState("");
  const [issue, setIssue] = useState("");
  const [report, setReport] = useState("");

  const generateReport = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department,
          risk,
          issue,
        }),
      });

      const data = await response.json();

      setReport(data.report);
    } catch (error) {
      console.error(error);
      alert("Error generating report");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ fontSize: "60px" }}>
        AI Audit Universe Manager
      </h1>

      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        style={{
          width: "300px",
          padding: "12px",
          margin: "10px",
        }}
      />

      <br />

      <input
        type="text"
        placeholder="Risk Level"
        value={risk}
        onChange={(e) => setRisk(e.target.value)}
        style={{
          width: "300px",
          padding: "12px",
          margin: "10px",
        }}
      />

      <br />

      <input
        type="text"
        placeholder="Issue"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        style={{
          width: "300px",
          padding: "12px",
          margin: "10px",
        }}
      />

      <br />

      <button
        onClick={generateReport}
        style={{
          padding: "12px 25px",
          margin: "10px",
          cursor: "pointer",
        }}
      >
        Generate Report
      </button>

      <h2>Generated Audit Report</h2>

      <div
        style={{
          whiteSpace: "pre-wrap",
          border: "1px solid gray",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        {report}
      </div>
    </div>
  );
}

export default App;