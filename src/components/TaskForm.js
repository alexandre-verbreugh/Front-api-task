import React, { useState } from 'react';

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        isDone: false,
      }),
    });

    if (response.ok) {
      const newTask = await response.json();
      onTaskCreated(newTask); // pour rafraîchir la liste
      setTitle('');
      setDescription('');
    } else {
      console.error('Erreur lors de l’ajout de la tâche');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter une tâche</h2>
      <div>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default TaskForm;
