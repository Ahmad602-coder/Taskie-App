// src/components/TaskDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const initialTasks = [
  { id: 1, name: 'Design new logo', status: 'In Progress', dueDate: '2024-09-15' },
  { id: 2, name: 'Develop landing page', status: 'Not Started', dueDate: '2024-10-01' },
  { id: 3, name: 'User testing', status: 'Completed', dueDate: '2024-08-30' }
];

const TaskDetails = () => {
  const { taskId } = useParams();
  const task = initialTasks.find(task => task.id === parseInt(taskId, 10));

  if (!task) {
    return <div>Task not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Task Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">{task.name}</h2>
        <p>Status: {task.status}</p>
        <p>Due Date: {task.dueDate}</p>
      </div>
    </div>
  );
};

export default TaskDetails;
