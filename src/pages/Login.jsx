import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    // Validate email
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    // Validate password
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      // AuthContext performs the API request
      await login(email, password);

      // No navigation required.
      // App.jsx automatically shows Dashboard
      // after authentication state changes.
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f1f5f9",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "35px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "55px",
              height: "55px",
              margin: "0 auto 15px",
              borderRadius: "12px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "25px",
              fontWeight: "700",
            }}
          >
            C
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "26px",
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            Co-op Services
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#64748b",
            }}
          >
            Admin Panel Login
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "600",
              color: "#334155",
            }}
          >
            Admin Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter admin email"
            autoComplete="email"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px 14px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              marginBottom: "18px",
              fontSize: "14px",
              outline: "none",
            }}
          />

          {/* Password */}
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "600",
              color: "#334155",
            }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter password"
            autoComplete="current-password"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px 14px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              marginBottom: "22px",
              fontSize: "14px",
              outline: "none",
            }}
          />

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: loading
                ? "#93c5fd"
                : "#2563eb",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "600",
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;