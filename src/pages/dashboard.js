import { useEffect, useState } from "react";
import API from "../api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  const load = async () => {
    try {
      const res = await API.get("/complaints");
      setComplaints(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resolve = async (id) => {
    await API.put(`/complaints/${id}`, { status: "resolved" });
    load();
  };

  const remove = async (id) => {
    await API.delete(`/complaints/${id}`);
    load();
  };

  // CHART DATA
  const resolved = complaints.filter(c => c.status === "resolved").length;
  const pending = complaints.filter(c => c.status === "pending").length;

  const data = [
    { name: "Resolved", value: resolved },
    { name: "Pending", value: pending }
  ];

  const COLORS = ["#22c55e", "#f59e0b"];

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0b1220", color: "white" }}>

      {/* SIDEBAR */}
      <div style={{ width: 220, background: "#111827", padding: 20 }}>
        <h2>ComplaintSys</h2>
        <button onClick={load}>Refresh</button>
        <button onClick={() => { localStorage.clear(); window.location.href="/"; }}>
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: 20, overflowY: "auto" }}>
        <h1>Dashboard</h1>

        {/* CHART */}
        <div style={{ background: "#111827", padding: 20, borderRadius: 10, width: 320 }}>
          <PieChart width={300} height={300}>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))", gap: 10, marginTop: 20 }}>
          {complaints.map((c) => (
            <div key={c._id} style={{ background: "#111827", padding: 15, borderRadius: 10 }}>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <span>{c.status}</span>

              <div style={{ marginTop: 10 }}>
                <button onClick={() => resolve(c._id)}>Resolve</button>
                <button onClick={() => remove(c._id)} style={{ marginLeft: 10, background: "red" }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}