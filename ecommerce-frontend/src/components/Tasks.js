import React, { useEffect, useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tasks/")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  return (
    <div className="p-4">
      <h2>Tasks</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default Tasks;
        
