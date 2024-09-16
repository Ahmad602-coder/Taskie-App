// src/components/Dashboard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialTasks = [
  { id: 1, name: 'Design new logo', status: 'In Progress', dueDate: '2024-09-15' },
  { id: 2, name: 'Develop landing page', status: 'Not Started', dueDate: '2024-10-01' },
  { id: 3, name: 'User testing', status: 'Completed', dueDate: '2024-08-30' }
];

const initialLocations = [
  { id: 1, name: 'Headquarters', address: '123 Main St', capacity: 500 },
  { id: 2, name: 'Branch Office', address: '456 Elm St', capacity: 100 },
  { id: 3, name: 'Warehouse', address: '789 Oak St', capacity: 1000 }
];

const initialReminders = [
  { id: 1, taskId: 1, reminderText: 'Follow up on logo design.' },
  { id: 2, taskId: 2, reminderText: 'Check landing page progress.' }
];

const Dashboard = () => {
  const [tasks] = useState(initialTasks);
  const [locations] = useState(initialLocations);
  const [reminders] = useState(initialReminders);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard Overview</h1>

      {/* Overview Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mb-12">
        {/* Combined Total Tasks and View Tasks */}
        <div className="bg-blue-500 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-between">
          <div className="text-center mb-4">
            <span className="text-4xl block">Total Tasks</span>
            <span className="text-5xl font-bold block">{tasks.length}</span>
          </div>
          <Link to="/tasks" className="bg-white text-blue-500 px-6 py-3 rounded-md mt-auto">
            View All Tasks
          </Link>
        </div>

        {/* Combined Total Locations and View Locations */}
        <div className="bg-green-500 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-between">
          <div className="text-center mb-4">
            <span className="text-4xl block">Total Locations</span>
            <span className="text-5xl font-bold block">{locations.length}</span>
          </div>
          <Link to="/locations" className="bg-white text-green-500 px-6 py-3 rounded-md mt-auto">
            View All Locations
          </Link>
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="bg-gray-200 rounded-xl shadow-md p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Company Updates</h2>
        <ul className="list-disc list-inside">
          <li>New features coming next quarter.</li>
          <li>Team-building activity scheduled for next month.</li>
          <li>Office renovation will start next week.</li>
        </ul>
      </div>

      {/* Self-Reminders Section */}
      <div className="bg-gray-200 rounded-xl shadow-md p-6 max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Self-Reminders</h2>
        <ul className="list-disc list-inside">
          {reminders.map(reminder => (
            <li key={reminder.id}>
              <Link to={`/tasks/${reminder.taskId}`} className="text-blue-500">
                {reminder.reminderText}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
