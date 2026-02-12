import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';

// Import your pages (Ensure these paths match your folder structure)
import Home from './pages/Home';
import About from './pages/about';
import Contact from './pages/contact';
import Login from './pages/Login';
import Signup from './pages/signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Sidebar from './pages/Sidebar';
import Header from './components/Header';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  return (
    <div className="flex h-screen w-full bg-[#0B0F19] overflow-hidden relative">
      {/* Background Orbs */}
      <div className="orb orb-primary"></div>
      <div className="orb orb-secondary"></div>

      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        currentSessionId={currentSessionId}
        onSessionChange={setCurrentSessionId}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto relative custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;