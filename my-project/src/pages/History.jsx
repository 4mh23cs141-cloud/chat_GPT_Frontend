import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    History as HistoryIcon,
    Clock,
    MessageSquare,
    Trash2,
    Search,
    Calendar
} from 'lucide-react';
import Header from '../components/Header';

const History = () => {
    const [sessions, setSessions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSessions, setFilteredSessions] = useState([]);
    const navigate = useNavigate();

    // Load sessions from localStorage
    useEffect(() => {
        const loadSessions = () => {
            const savedSessions = localStorage.getItem('nexus_chat_sessions');
            if (savedSessions) {
                try {
                    const parsed = JSON.parse(savedSessions);
                    setSessions(parsed);
                    setFilteredSessions(parsed);
                } catch (error) {
                    console.error('Failed to load sessions:', error);
                }
            }
        };

        loadSessions();
    }, []);

    // Filter sessions based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredSessions(sessions);
        } else {
            const filtered = sessions.filter(session =>
                session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                session.messages.some(msg =>
                    msg.content.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setFilteredSessions(filtered);
        }
    }, [searchQuery, sessions]);

    const handleRestoreSession = (session) => {
        // Save session messages to current chat
        localStorage.setItem('nexus_chat_history', JSON.stringify(session.messages));
        localStorage.setItem('nexus_current_session', session.id);

        // Navigate to home
        navigate('/');
    };

    const handleDeleteSession = (sessionId, e) => {
        e.stopPropagation();

        if (window.confirm('Are you sure you want to delete this chat session?')) {
            const updatedSessions = sessions.filter(s => s.id !== sessionId);
            localStorage.setItem('nexus_chat_sessions', JSON.stringify(updatedSessions));
            setSessions(updatedSessions);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-transparent overflow-hidden">
            <Header />

            <div className="flex-1 overflow-y-auto p-6 lg:p-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                            <HistoryIcon className="text-indigo-400" size={36} />
                            Chat History
                        </h1>
                        <p className="text-gray-400">View and restore your previous conversations</p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#1e293b]/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-[#131B2C] p-4 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-500/10 rounded-lg">
                                    <MessageSquare className="text-indigo-400" size={20} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{sessions.length}</div>
                                    <div className="text-sm text-gray-400">Total Chats</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#131B2C] p-4 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                    <MessageSquare className="text-purple-400" size={20} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">
                                        {sessions.reduce((acc, s) => acc + s.messageCount, 0)}
                                    </div>
                                    <div className="text-sm text-gray-400">Total Messages</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#131B2C] p-4 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyan-500/10 rounded-lg">
                                    <Clock className="text-cyan-400" size={20} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">
                                        {sessions.length > 0 ? formatDate(sessions[0].updatedAt) : 'N/A'}
                                    </div>
                                    <div className="text-sm text-gray-400">Last Activity</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sessions List */}
                    {filteredSessions.length === 0 ? (
                        <div className="text-center py-16">
                            <HistoryIcon className="mx-auto text-gray-600 mb-4" size={64} />
                            <h3 className="text-xl font-semibold text-gray-400 mb-2">
                                {searchQuery ? 'No matching conversations' : 'No chat history yet'}
                            </h3>
                            <p className="text-gray-500">
                                {searchQuery ? 'Try a different search term' : 'Start a conversation to see it here'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredSessions.map((session) => (
                                <div
                                    key={session.id}
                                    onClick={() => handleRestoreSession(session)}
                                    className="bg-[#131B2C] border border-white/5 rounded-xl p-5 hover:border-indigo-500/30 transition-all cursor-pointer group relative"
                                >
                                    {/* Delete Button */}
                                    <button
                                        onClick={(e) => handleDeleteSession(session.id, e)}
                                        className="absolute top-3 right-3 p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Delete session"
                                    >
                                        <Trash2 size={16} className="text-red-400" />
                                    </button>

                                    {/* Session Title */}
                                    <h3 className="text-white font-semibold mb-2 pr-8 line-clamp-2">
                                        {session.title}
                                    </h3>

                                    {/* Message Preview */}
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {session.messages.length > 1
                                            ? session.messages[1].content.substring(0, 100) + '...'
                                            : 'No response yet'}
                                    </p>

                                    {/* Metadata */}
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <MessageSquare size={14} />
                                            <span>{session.messageCount} messages</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            <span>{formatDate(session.updatedAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;
