import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTaskCreated = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="App">
      <h1>Mon gestionnaire de tâches</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList refresh={refresh} />
    </div>
  );
}

export default App;
