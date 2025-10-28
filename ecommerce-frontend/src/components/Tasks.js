import React, { useEffect, useState } from "react";
import { CheckCircle, Trash2 } from "lucide-react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

  // ✅ Fetch all tasks
  const fetchTasks = () => {
    fetch(`${API}/api/tasks/`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  // ✅ Add new task
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API}/api/tasks/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then(() => {
        setTitle("");
        fetchTasks();
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  // ✅ Toggle complete
  const toggleComplete = (id, completed) => {
    fetch(`${API}/api/tasks/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    })
      .then((res) => res.json())
      .then(() => fetchTasks())
      .catch((err) => console.error("Error updating task:", err));
  };

  // ✅ Delete task
  const deleteTask = (id) => {
    fetch(`${API}/api/tasks/${id}/`, { method: "DELETE" })
      .then(() => fetchTasks())
      .catch((err) => console.error("Error deleting task:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
          Task Manager
        </h2>

        {/* ✅ Add Task Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-3 mb-6"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a new task"
            required
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Add
          </button>
        </form>

        {/* ✅ Task List */}
        {tasks.length > 0 ? (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between p-3 border border-gray-200 rounded-lg transition ${
                  task.completed
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 hover:bg-blue-50"
                }`}
              >
                <div
                  className={`flex items-center gap-2 cursor-pointer ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                  onClick={() => toggleComplete(task.id, task.completed)}
                >
                  <CheckCircle
                    size={22}
                    className={`${
                      task.completed
                        ? "text-green-500"
                        : "text-gray-400 hover:text-green-500"
                    } transition`}
                  />
                  <span className="font-medium">{task.title}</span>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center italic">
            No tasks found. Add one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
            
