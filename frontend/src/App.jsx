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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [department, setDepartment] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [issue, setIssue] = useState("");

  const [report, setReport] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid Credentials");
    }
  };

  const generateReport = () => {
    const generatedReport = `
Audit Report: ${issue} in ${department} Department

Summary:
An audit was conducted to investigate the issue related to ${issue} in the ${department} department.

The audit identified a ${riskLevel} level risk affecting organizational compliance, monitoring systems, and operational efficiency.

The audit found that:

1. Internal monitoring systems were not properly configured.
2. Security controls lacked regular review procedures.
3. Employee awareness regarding compliance was insufficient.
4. Risk management practices were outdated.
5. Reporting and escalation systems were delayed.

Recommendations:

1. Implement stronger monitoring and compliance systems.
2. Conduct regular internal audits and risk assessments.
3. Improve employee cybersecurity and compliance training.
4. Upgrade outdated security and operational software.
5. Create automated compliance tracking dashboards.
6. Establish proper documentation and incident reporting systems.

Implementation Timeline:

Short-term (0–3 months):
Immediate review and monitoring improvements.

Medium-term (3–6 months):
Upgrade systems and improve staff audit training.

Long-term (6–12 months):
Full AI-based compliance and risk management integration.

Conclusion:

By implementing these recommendations, the organization can significantly reduce operational risks, improve compliance, and strengthen overall audit management efficiency.
`;

    setReport(generatedReport);
  };

  const downloadPDF = () => {
    const blob = new Blob([report], { type: "text/plain" });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "audit-report.txt";

    link.click();
  };

  const pieData = [
    { name: "Risk", value: riskLevel ? 1 : 0 },
    { name: "Safe", value: riskLevel ? 0 : 1 },
  ];

  const COLORS = ["#ff4d4d", "#00C49F"];

  const barData = [
    { department: "HR", audits: department === "HR" ? 1 : 0 },
    { department: "Finance", audits: department === "Finance" ? 1 : 0 },
    { department: "IT", audits: department === "IT" ? 1 : 0 },
    { department: "Security", audits: department === "Security" ? 1 : 0 },
  ];

  return (
    <div className="app">

      {!isLoggedIn ? (
        <div className="login-container">

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
      ) : (
        <div className="main-content">

          <h1>AI Audit Universe Manager</h1>

          <div className="form-section">

            <input
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />

            <input
              type="text"
              placeholder="Risk Level"
              value={riskLevel}
              onChange={(e) => setRiskLevel(e.target.value)}
            />

            <input
              type="text"
              placeholder="Issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />

            <button onClick={generateReport}>
              Generate Report
            </button>

          </div>

          {report && (
            <>
              <button
                className="download-btn"
                onClick={downloadPDF}
              >
                Download PDF
              </button>

              <div className="report-box">

                <h2>Generated Audit Report</h2>

                <div className="report-text">
                  {report}
                </div>

              </div>

              <div className="charts-container">

                <div className="chart-box">
                  <h2>Risk Distribution</h2>

                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>

                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-box">
                  <h2>Department Audits</h2>

                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>

                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis dataKey="department" />

                      <YAxis />

                      <Tooltip />

                      <Bar dataKey="audits" fill="#00c4ff" />

                    </BarChart>
                  </ResponsiveContainer>

                </div>

              </div>

              <div className="history-box">

                <h2>Audit History</h2>

                <table>

                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Risk Level</th>
                      <th>Issue</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{department}</td>
                      <td>{riskLevel}</td>
                      <td>{issue}</td>
                    </tr>
                  </tbody>

                </table>

              </div>

              <button
                className="logout-btn"
                onClick={() => setIsLoggedIn(false)}
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}
    </div>
  );
}

export default App;