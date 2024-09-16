import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TaskModule from './components/TaskModule';
import LocationModule from './components/LocationModule';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm'; // Import RegistrationForm
import UserProfile from './components/UserProfile';
import Settings from './components/Settings';
import TaskDetails from './components/TaskDetails';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskModule />} />
        <Route path="/tasks/:taskId" element={<TaskDetails />} />
        <Route path="/locations" element={<LocationModule />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} /> {/* Add this line */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
