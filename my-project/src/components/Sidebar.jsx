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
    LayoutGrid
} from 'lucide-react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();

    const menuItems = [
        { name: 'New Chat', icon: Plus, path: '/', primary: true },
        { name: 'History', icon: History, path: '/history' },
        { name: 'Library', icon: LayoutGrid, path: '/library' },
        { name: 'About', icon: MessageSquare, path: '/about' },
        { name: 'Contact', icon: MessageSquare, path: '/contact' },
    ];

    return (
        <div className={`flex flex-col h-screen bg-[#f9f9f9] border-r border-gray-200 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
            <div className="flex items-center justify-between p-4">
                {isOpen && <span className="font-semibold text-xl text-gray-800">ChatGPT</span>}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    {isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2.5 mb-1 rounded-xl transition-all ${location.pathname === item.path
                                ? 'bg-white shadow-sm text-black font-medium'
                                : 'text-gray-600 hover:bg-gray-200'
                            } ${item.primary ? 'bg-black text-white hover:bg-gray-800' : ''}`}
                    >
                        <item.icon size={20} />
                        {isOpen && <span className="truncate">{item.name}</span>}
                    </Link>
                ))}
            </div>

            <div className="p-4 border-t border-gray-200">
                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-200 transition-all">
                    <Settings size={20} />
                    {isOpen && <span>Settings</span>}
                </button>
                <button className="flex items-center gap-3 w-full px-3 py-2 mt-2 rounded-xl text-gray-600 hover:bg-gray-200 transition-all">
                    <User size={20} />
                    {isOpen && <span>Profile</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
