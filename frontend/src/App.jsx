import { useState } from "react";
import "./App.css";
import logo from "./assets/logo.jpeg";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import jsPDF from "jspdf";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [department, setDepartment] = useState("");
  const [risk, setRisk] = useState("");
  const [issue, setIssue] = useState("");

  const [report, setReport] = useState("");

  const [history, setHistory] = useState([
    {
      department: "HR",
      risk: "High",
      issue: "Employee Data Leak",
      date: new Date().toLocaleString(),
    },
    {
      department: "Finance",
      risk: "Critical",
      issue: "Unauthorized Transactions",
      date: new Date().toLocaleString(),
    },
    {
      department: "IT",
      risk: "Medium",
      issue: "Weak Password Security",
      date: new Date().toLocaleString(),
    },
  ]);

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

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

      const newAudit = {
        department,
        risk,
        issue,
        date: new Date().toLocaleString(),
      };

      setHistory([newAudit, ...history]);
    } catch (error) {
      console.error(error);
      setReport("Error generating report");
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    const lines = doc.splitTextToSize(report, 180);

    doc.text("AI Audit Report", 10, 10);
    doc.text(lines, 10, 20);

    doc.save("audit-report.pdf");
  };

  const pieData = [
    {
      name: "High",
      value: history.filter((item) => item.risk === "High").length,
    },
    {
      name: "Medium",
      value: history.filter((item) => item.risk === "Medium").length,
    },
    {
      name: "Critical",
      value: history.filter((item) => item.risk === "Critical").length,
    },
  ];

  const COLORS = ["#ff4d4d", "#ffaa00", "#aa00ff"];

  if (!isLoggedIn) {
    return (
      <div className="app">
        <img src={logo} alt="logo" className="company-logo" />

        <h1>AI Audit Universe Manager</h1>

        <div className="login-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>
        </div>

        <p>Username: admin</p>
        <p>Password: admin123</p>
      </div>
    );
  }

  return (
    <div className="app">
      <img src={logo} alt="logo" className="company-logo" />

      <h1>AI Audit Universe Manager</h1>

      <button
        className="logout-btn"
        onClick={() => setIsLoggedIn(false)}
      >
        Logout
      </button>

      <div className="input-container">
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          type="text"
          placeholder="Risk Level"
          value={risk}
          onChange={(e) => setRisk(e.target.value)}
        />

        <input
          type="text"
          placeholder="Issue"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />

        <button className="generate-btn" onClick={generateReport}>
          Generate Report
        </button>
      </div>

      {report && (
        <>
          <button className="pdf-btn" onClick={downloadPDF}>
            Download PDF
          </button>

          <h2>Generated Audit Report</h2>

          <div className="report-box">{report}</div>
        </>
      )}

      <div className="charts-container">
        <div className="chart-box">
          <h3>Risk Distribution</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Department Audits</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="department" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="risk.length" fill="#00cfff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h2>Audit History</h2>

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