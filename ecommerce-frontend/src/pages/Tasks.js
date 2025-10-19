import { useState } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete React project", completed: false },
    { id: 2, title: "Push code to GitHub", completed: true },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  return (
    <div className="tasks-page">
      <h2>Tasks</h2>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(t.id)}
            />
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
    
