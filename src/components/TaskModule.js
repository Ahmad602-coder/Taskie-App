import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskModule = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'not started',
    priority: '',
    dueDate: '',
  });

  useEffect(() => {
    // Fetch tasks from backend
    axios.get('http://localhost:5000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Post new task to backend
    axios.post('http://localhost:5000/api/tasks', {
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority,
      due_date: newTask.dueDate,
    })
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask({
          title: '',
          description: '',
          status: 'not started',
          priority: '',
          dueDate: '',
        });
      })
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
            <input
              type="text"
              name="title"
              placeholder="Task title"
              value={newTask.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
            <input
              type="text"
              name="description"
              placeholder="Task description"
              value={newTask.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="not started">Not Started</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
            <select
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="w-full md:w-1/3 px-2">
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Create New Task
        </button>
      </form>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left p-2">Title</th>
            <th className="text-left p-2">Description</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Priority</th>
            <th className="text-left p-2">Due Date</th>
            <th className="text-left p-2">Created At</th>
            <th className="text-left p-2">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-b">
              <td className="p-2">{task.title}</td>
              <td className="p-2">{task.description}</td>
              <td className="p-2">{task.status}</td>
              <td className="p-2">{task.priority}</td>
              <td className="p-2">{new Date(task.due_date).toLocaleDateString()}</td>
              <td className="p-2">{new Date(task.created_at).toLocaleString()}</td>
              <td className="p-2">{new Date(task.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskModule;
