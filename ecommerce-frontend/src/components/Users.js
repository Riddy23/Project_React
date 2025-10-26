import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });


  const API = process.env.REACT_APP_API_URL;

  const fetchUsers = () => {
    fetch("${API}/api/users/")
    // fetch("http://127.0.0.1:8000/api/users/")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("${API}/api/users/", {
    // fetch("http://127.0.0.1:8000/api/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setForm({ username: "", email: "", password: "" });
        fetchUsers();
      })
      .catch((err) => console.error("Error adding user:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2>Users</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Add User</button>
      </form>

      {users.length > 0 ? (
        <ul>
          {users.map((u) => (
            <li key={u.id}>{u.username} ({u.email})</li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Users;
      
