import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Info, Mail, Settings, User, LogOut, Plus, Cpu, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Sidebar = ({ isOpen, currentSessionId, onSessionChange }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/sessions?token=${token}`);
            if (response.ok) {
                const data = await response.json();
                setSessions(data);
            }
        } catch (err) {
            console.error("Failed to fetch sessions:", err);
        }
    };

    const handleNewChat = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://127.0.0.1:8000/sessions?token=${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: "New Chat" })
            });

            if (response.ok) {
                const newSession = await response.json();
                setSessions(prev => [newSession, ...prev]);
                if (onSessionChange) onSessionChange(newSession.id);
                navigate('/');
            }
        } catch (err) {
            console.error("Failed to create session:", err);
        }
    };

    const handleDeleteSession = async (sessionId, e) => {
        e.stopPropagation();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://127.0.0.1:8000/sessions/${sessionId}?token=${token}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setSessions(prev => prev.filter(s => s.id !== sessionId));
                if (currentSessionId === sessionId && onSessionChange) {
                    // Switch to first available session or create new one
                    const remaining = sessions.filter(s => s.id !== sessionId);
                    if (remaining.length > 0) {
                        onSessionChange(remaining[0].id);
                    } else {
                        handleNewChat();
                    }
                }
            }
        } catch (err) {
            console.error("Failed to delete session:", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const menu = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Nexus Chat', path: '/', icon: MessageSquare },
        { name: 'About', path: '/about', icon: Info },
        { name: 'Contact', path: '/contact', icon: Mail },
    ];

    return (
        <div className={`h-screen bg-[#080b12] border-r border-white/5 transition-all duration-300 ${isOpen ? 'w-72' : 'w-0'} flex flex-col overflow-hidden`}>
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Cpu size={18} className="text-white" />
                </div>
                <span className="font-bold text-xl text-white tracking-tighter">NEXUS AI</span>
            </div>

            <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
                <button onClick={handleNewChat} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-black font-bold mb-4 shadow-lg hover:scale-[1.02] transition-transform w-full">
                    <Plus size={18} /> New Chat
                </button>

                {/* Chat History */}
                <div className="space-y-1 mb-4">
                    {sessions.map(session => (
                        <div
                            key={session.id}
                            onClick={() => onSessionChange && onSessionChange(session.id)}
                            className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all group ${currentSessionId === session.id ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <MessageSquare size={14} className="shrink-0" />
                                <span className="text-xs truncate">{session.title}</span>
                            </div>
                            <button
                                onClick={(e) => handleDeleteSession(session.id, e)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                            >
                                <Trash2 size={12} className="text-red-400" />
                            </button>
                        </div>
                    ))}
                </div>

                {menu.map(item => (
                    <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === item.path ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                        <item.icon size={18} /> {item.name}
                    </Link>
                ))}
            </div>

            <div className="p-4 border-t border-white/5 space-y-2">
                <Link to="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 text-xs font-bold">U</div>
                    <div className="text-sm font-medium text-gray-300">User Profile</div>
                </Link>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};
export default Sidebar;
