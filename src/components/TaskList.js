import React, { useEffect, useState } from 'react';

function TaskList({ refresh }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const fetchTasks = () => {
    fetch('http://localhost:8000/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Erreur API :', err));
  };

  const markAsDone = async (taskId) => {
    await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isDone: true }),
    });

    fetchTasks(); // Recharge la liste après modification
  };

  const deleteTask = async (taskId) => {
  await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
    method: 'DELETE',
  });

  fetchTasks(); // Recharger après suppression
};


  return (
    <div>
      <h2>Liste des tâches</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description} ({task.isDone ? '✅ faite' : '🕒 à faire'})
            {!task.isDone && (
              <button onClick={() => markAsDone(task.id)} style={{ marginLeft: '10px' }}>
                Marquer comme faite
              </button>
            )}
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '10px', color: 'red' }}>
                  Supprimer
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
