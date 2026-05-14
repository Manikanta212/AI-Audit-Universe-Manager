import { useState } from "react";
import "./App.css";
import jsPDF from "jspdf";

function App() {
  const [department, setDepartment] = useState("");
  const [risk, setRisk] = useState("");
  const [issue, setIssue] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]);

  const generateReport = async () => {
    setLoading(true);

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

      const newAudit = {
        department,
        risk,
        issue,
        date: new Date().toLocaleString(),
      };

      setHistory([newAudit, ...history]);
    } catch (error) {
      console.error(error);
      alert("Error generating report");
    }

    setLoading(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    const lines = doc.splitTextToSize(report, 170);

    doc.setFontSize(18);
    doc.text("AI Audit Report", 20, 20);

    doc.setFontSize(12);
    doc.text(lines, 20, 40);

    doc.save("audit-report.pdf");
  };

  return (
    <div className="container">
      <h1 className="title">AI Audit Universe Manager</h1>

      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="input-box"
      />

      <input
        type="text"
        placeholder="Risk Level"
        value={risk}
        onChange={(e) => setRisk(e.target.value)}
        className="input-box"
      />

      <input
        type="text"
        placeholder="Issue"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        className="input-box"
      />

      <button
        onClick={generateReport}
        className="generate-btn"
      >
        Generate Report
      </button>

      <br /><br />

      <button
        onClick={downloadPDF}
        className="generate-btn"
      >
        Download PDF
      </button>

      {loading && <p>Generating AI Report...</p>}

      <h2>Generated Audit Report</h2>

      <div className="report-box">
        {report}
      </div>

      <h2 style={{ marginTop: "50px" }}>
        Audit History
      </h2>

      <table className="history-table">
        <thead>
          <tr>
            <th>Department</th>
            <th>Risk</th>
            <th>Issue</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.department}</td>
              <td>{item.risk}</td>
              <td>{item.issue}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;