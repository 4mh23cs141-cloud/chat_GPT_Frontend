import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    MessageSquare,
    History,
    Settings,
    Plus,
    PanelLeftClose,
    PanelLeftOpen,
    User,
    LayoutGrid,
    LayoutDashboard // Added for Dashboard
} from 'lucide-react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();

    // Updated menu items list
    const menuItems = [
        { name: 'New Chat', icon: Plus, path: '/', primary: true },
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'History', icon: History, path: '/history' },
        { name: 'Library', icon: LayoutGrid, path: '/library' },
        { name: 'About', icon: MessageSquare, path: '/about' },
        { name: 'Contact', icon: MessageSquare, path: '/contact' },
    ];

    return (
        <div className={`flex flex-col h-screen bg-[#0B0F19] border-r border-white/10 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>

            {/* Header with Toggle Button */}
            <div className="flex items-center justify-between p-4">
                {isOpen && <span className="font-bold text-xl text-white tracking-tight">Nexus AI</span>}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors"
                    title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    {isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
                </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto px-2 py-4">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    // Special handling for New Chat button
                    if (item.name === 'New Chat') {
                        return (
                            <button
                                key={item.name}
                                onClick={() => {
                                    // Dispatch custom event for new chat
                                    window.dispatchEvent(new Event('nexus:new-chat'));
                                    // Navigate to home
                                    window.location.href = '/';
                                }}
                                className="flex items-center gap-3 px-3 py-2.5 mb-1 rounded-xl transition-all w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:opacity-90"
                            >
                                <item.icon size={20} className="text-white" />
                                {isOpen && <span className="truncate">{item.name}</span>}
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 mb-1 rounded-xl transition-all ${isActive
                                ? 'bg-white/10 text-white font-semibold'
                                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                                }`}
                        >
                            <item.icon size={20} />
                            {isOpen && <span className="truncate">{item.name}</span>}
                        </Link>
                    );
                })}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-white/10">
                <Link
                    to="/settings"
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                >
                    <Settings size={20} />
                    {isOpen && <span>Settings</span>}
                </Link>
                <Link
                    to="/profile"
                    className="flex items-center gap-3 w-full px-3 py-2 mt-2 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                >
                    <User size={20} />
                    {isOpen && <span>Profile</span>}
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;