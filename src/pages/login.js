import { useState } from "react";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      window.location.href = "/dashboard";

    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="card">
        <h2>Complaint System</h2>
        <p className="sub">Login to continue</p>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="error">{error}</div>}

        <button onClick={login} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      {/* CSS */}
      <style>{`
        body {
          margin: 0;
          font-family: Arial;
          background: #0b1220;
        }

        .login-wrapper {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at top, #1e3a8a55, transparent),
                      radial-gradient(circle at bottom, #9333ea55, transparent);
          animation: bgMove 6s infinite alternate;
        }

        .card {
          width: 320px;
          padding: 25px;
          background: rgba(17, 24, 39, 0.9);
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          text-align: center;
          animation: fadeIn 0.6s ease;
          border: 1px solid #1f2937;
        }

        h2 {
          color: #60a5fa;
          margin-bottom: 5px;
        }

        .sub {
          color: #94a3b8;
          font-size: 12px;
          margin-bottom: 20px;
        }

        input {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border-radius: 10px;
          border: none;
          outline: none;
          background: #1f2937;
          color: white;
          transition: 0.3s;
        }

        input:focus {
          transform: scale(1.03);
          background: #111827;
        }

        button {
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #2563eb, #4f46e5);
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }

        button:hover {
          transform: translateY(-2px);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error {
          color: #f87171;
          font-size: 12px;
          margin-top: 10px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bgMove {
          from { filter: hue-rotate(0deg); }
          to { filter: hue-rotate(30deg); }
        }
      `}</style>
    </div>
  );
}