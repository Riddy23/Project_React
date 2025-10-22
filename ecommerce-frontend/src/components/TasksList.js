import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/tasks/tasks/";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.title) return alert("Please enter a task title");
    await axios.post(API_URL, newTask);
    setNewTask({ title: "", description: "" });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}${id}/`);
    fetchTasks();
  };

  const toggleComplete = async (id) => {
    await axios.post(`${API_URL}${id}/toggle_complete/`);
    fetchTasks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📝 Task Management</h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              background: task.completed ? "#d4edda" : "#f8d7da",
              padding: "10px",
              margin: "5px 0",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{task.title}</strong> — {task.description}
            </div>
            <div>
              <button onClick={() => toggleComplete(task.id)}>
                {task.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <button onClick={() => deleteTask(task.id)} style={{ marginLeft: "10px" }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
