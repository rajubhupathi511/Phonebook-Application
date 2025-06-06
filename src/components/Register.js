// src/components/Register.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({ name: "", email: "", phoneno: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validate = (field, value) => {
    let error = "";

    if (field === "phoneno") {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(value)) error = "Phone must be 10 digits & start with 6, 7, 8, or 9";
    }

    if (field === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailRegex.test(value)) error = "Email must end with @gmail.com";
    }

    if (field === "password") {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;
      if (!passwordRegex.test(value)) error = "Min 7 chars, 1 capital, 1 special char required";
    }

    setFormErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    validate(name, value);
  };

  const isFormValid = () => {
    return (
      !formErrors.email &&
      !formErrors.phoneno &&
      !formErrors.password &&
      user.name &&
      user.email &&
      user.phoneno &&
      user.password
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      await axios.post("http://localhost:1678/api/register", user);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/free-photo/clipboard-with-ribbons-candles_23-2147628613.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Register Here</h2>
        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            name="name"
            placeholder="Name"
            required
            value={user.name}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />

          <input
            name="email"
            placeholder="Email"
            required
            value={user.email}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}

          <input
            name="phoneno"
            placeholder="Phone Number"
            required
            value={user.phoneno}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          {formErrors.phoneno && <p style={{ color: "red" }}>{formErrors.phoneno}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={user.password}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          {formErrors.password && <p style={{ color: "red" }}>{formErrors.password}</p>}

          <button
            type="submit"
            disabled={!isFormValid()}
            style={{
              backgroundColor: "#006400",
              color: "white",
              padding: "10px",
              fontSize: "18px",
              borderRadius: "5px",
              cursor: isFormValid() ? "pointer" : "not-allowed",
              border: "none",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
