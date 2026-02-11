import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import {
  Settings,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  Trash2
} from 'lucide-react';
import './App.css';
import Home from './pages/Home';
import About from './pages/about';
import Contact from './pages/contact';
import Login from './pages/Login';
import Signup from './pages/signup';
import Dashboard from './pages/Dashboard';

// --- Sidebar Component ---
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  // Hide sidebar on Login and Signup pages for a cleaner UI
  const hideSidebar = location.pathname === '/login' || location.pathname === '/signup';
  if (hideSidebar) return null;

  const recentChats = [];

  return (
    <div className={`flex flex-col h-screen bg-[#f9f9f9] border-r border-gray-200 transition-all duration-300 relative ${isOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
      <div className={`absolute top-4 ${isOpen ? 'right-4' : '-right-12'} z-50`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors bg-[#f9f9f9] border border-gray-200 shadow-sm"
        >
          {isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
        </button>
      </div>

      <div className="flex flex-col h-full p-3 pt-4">
        <button
          onClick={() => window.location.href = '/chat'}
          className="flex items-center justify-between w-full p-3 mb-4 rounded-xl hover:bg-gray-200 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="p-1 bg-white rounded-full shadow-sm">
              <Plus size={18} />
            </div>
            <span className="font-medium text-gray-800">New Chat</span>
          </div>
        </button>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent</div>
          <div className="space-y-0.5">
            {recentChats.map((chat) => (
              <div key={chat.id} className="group flex items-center justify-between px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-200 cursor-pointer transition-all">
                <span className="text-sm truncate pr-2">{chat.title}</span>
                <button className="hidden group-hover:block p-1 hover:bg-gray-300 rounded">
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 mt-auto space-y-1">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-gray-700 hover:bg-gray-200 transition-all">
            <Settings size={20} className="text-gray-500" />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-gray-700 hover:bg-gray-200 transition-all">
            <User size={20} className="text-gray-500" />
            <span className="text-sm font-medium">Upgrade Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
function App() {
  return (
    <Router>
      <div className="flex h-screen w-full bg-white text-gray-900 overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <Routes>
            {/* Added /chat route so navigate('/chat') works */}
            <Route path="/chat" element={<Home />} />

            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;