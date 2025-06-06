// src/components/Dashboard.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`http://localhost:1678/api/contacts/${user.id}`);
      setContacts(res.data);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
    }
  };

  useEffect(() => {
    if (!user) navigate("/login");
    else fetchContacts();
  }, []);

  const saveContact = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:1678/api/contacts", { ...contact, user });
      setContact({ name: "", email: "", phone: "" });
      fetchContacts();
    } catch (err) {
      console.error("Failed to save contact:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
  style={{
    backgroundImage: `url("https://wpengine.com/wp-content/uploads/2021/04/contact-form-header-1024x535.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
  }}
>
  <div
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.40)", // White with 85% opacity
      padding: "30px",
      borderRadius: "10px",
      width: "100%",
      maxWidth: "800px",
      boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    }}
  >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Welcome, {user?.name}</h2>
          <button
            onClick={logout}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "7px 14px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        <h3 style={{ marginTop: "20px" }}>Add New Contact</h3>
        <form onSubmit={saveContact} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            placeholder="Name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <input
            placeholder="Email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <input
            placeholder="Phone"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#006400",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save Contact
          </button>
        </form>

        <input
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <h3 style={{ marginTop: "20px" }}>Your Contacts</h3>
        <div style={{ overflowX: "auto" }}>
          <table
            border="1"
            cellPadding="10"
            style={{
              borderCollapse: "collapse",
              marginTop: "10px",
              width: "100%",
              backgroundColor: "#f9f9f9",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#e0e0e0" }}>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {contacts
                .filter(
                  (c) =>
                    c.name.toLowerCase().includes(search.toLowerCase()) ||
                    c.email.toLowerCase().includes(search.toLowerCase()) ||
                    c.phone.includes(search)
                )
                .map((c, index) => (
                  <tr key={c.id}>
                    <td>{index + 1}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
