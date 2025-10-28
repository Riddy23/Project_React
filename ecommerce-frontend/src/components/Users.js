import React, { useEffect, useState } from "react";
import { UserPlus, Mail, Lock, Trash2 } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

  // ✅ Fetch users
  const fetchUsers = () => {
    fetch(`${API}/api/users/`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  };

  // ✅ Add new user
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API}/api/users/`, {
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

  // ✅ Delete user
  const deleteUser = (id) => {
    fetch(`${API}/api/users/${id}/`, { method: "DELETE" })
      .then(() => fetchUsers())
      .catch((err) => console.error("Error deleting user:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6 flex items-center justify-center gap-2">
          <UserPlus className="text-blue-600" size={24} />
          User Management
        </h2>

        {/* ✅ Add User Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 mb-6"
        >
          <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-400">
            <UserPlus className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              className="flex-1 outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Mail className="text-gray-400 mr-2" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="flex-1 outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Lock className="text-gray-400 mr-2" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="flex-1 outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
          >
            Add User
          </button>
        </form>

        {/* ✅ User List */}
        {users.length > 0 ? (
          <ul className="space-y-3">
            {users.map((u) => (
              <li
                key={u.id}
                className="flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg p-3 transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">{u.username}</p>
                  <p className="text-sm text-gray-500">{u.email}</p>
                </div>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center italic">
            No users found. Add one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Users;
    
