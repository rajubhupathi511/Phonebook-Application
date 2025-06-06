// src/components/Login.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1678/api/login", loginData);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage:
          'url("https://as2.ftcdn.net/jpg/03/03/13/95/1000_F_303139589_lfxw7t0GAV3jUHY9IVpYE712aa2RT9H5.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="login-container"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333" }}>
          <mark style={{ backgroundColor: "#ffeeba" }}>Login</mark>
        </h2>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            placeholder="Email"
            required
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <input
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#006400",
              padding: "10px",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          >
            Submit
          </button>
        </form>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          New user?{" "}
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              cursor: "pointer",
              borderRadius: "4px",
              marginLeft: "5px",
            }}
            onClick={() => navigate("/register")}
          >
            Register Now
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
