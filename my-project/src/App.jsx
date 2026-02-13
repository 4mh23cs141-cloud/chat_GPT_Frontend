import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './pages/Sidebar';
import Home from './pages/Home';
import About from './pages/about';
import Contact from './pages/contact';
import Login from './pages/Login';
import Signup from './pages/signup';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="flex h-screen w-full bg-transparent text-white overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
