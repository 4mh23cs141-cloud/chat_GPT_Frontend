import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Mail,
    Calendar,
    MessageSquare,
    LogOut,
    Edit2,
    Save,
    X
} from 'lucide-react';
import Header from '../components/Header';

const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
    const [stats, setStats] = useState({ totalChats: 0, totalMessages: 0 });
    const navigate = useNavigate();

    // Load user profile from localStorage
    useEffect(() => {
        const loadProfile = () => {
            const savedProfile = localStorage.getItem('nexus_user_profile');
            if (savedProfile) {
                try {
                    const parsed = JSON.parse(savedProfile);
                    setUserProfile(parsed);
                    setEditedProfile(parsed);
                } catch (error) {
                    console.error('Failed to load profile:', error);
                }
            } else {
                // Create default profile if none exists
                const defaultProfile = {
                    name: 'Guest User',
                    email: 'guest@nexusai.com',
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString()
                };
                setUserProfile(defaultProfile);
                setEditedProfile(defaultProfile);
                localStorage.setItem('nexus_user_profile', JSON.stringify(defaultProfile));
            }

            // Load stats
            const sessions = localStorage.getItem('nexus_chat_sessions');
            if (sessions) {
                const parsed = JSON.parse(sessions);
                const totalChats = parsed.length;
                const totalMessages = parsed.reduce((acc, s) => acc + s.messageCount, 0);
                setStats({ totalChats, totalMessages });
            }
        };

        loadProfile();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        localStorage.setItem('nexus_user_profile', JSON.stringify(editedProfile));
        setUserProfile(editedProfile);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedProfile(userProfile);
        setIsEditing(false);
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            // Clear user session but keep chat history
            localStorage.removeItem('nexus_user_profile');
            navigate('/login');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!userProfile) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-gray-400">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-transparent overflow-hidden">
            <Header />

            <div className="flex-1 overflow-y-auto p-6 lg:p-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                            <User className="text-indigo-400" size={36} />
                            Profile
                        </h1>
                        <p className="text-gray-400">Manage your account information</p>
                    </div>

                    {/* Profile Card */}
                    <div className="bg-[#131B2C] border border-white/5 rounded-2xl p-8 mb-6">
                        {/* Avatar and Basic Info */}
                        <div className="flex items-start gap-6 mb-8">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                                {userProfile.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                {isEditing ? (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Name</label>
                                            <input
                                                type="text"
                                                value={editedProfile.name}
                                                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                                                className="w-full bg-[#1e293b]/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={editedProfile.email}
                                                onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                                                className="w-full bg-[#1e293b]/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500/50"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleSave}
                                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                                            >
                                                <Save size={18} />
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                            >
                                                <X size={18} />
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">{userProfile.name}</h2>
                                        <p className="text-gray-400 mb-4">{userProfile.email}</p>
                                        <button
                                            onClick={handleEdit}
                                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                                        >
                                            <Edit2 size={18} />
                                            Edit Profile
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Account Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-indigo-500/10 rounded-lg">
                                    <Calendar className="text-indigo-400" size={20} />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400">Member Since</div>
                                    <div className="text-white font-semibold">{formatDate(userProfile.createdAt)}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-500/10 rounded-lg">
                                    <Calendar className="text-purple-400" size={20} />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400">Last Login</div>
                                    <div className="text-white font-semibold">{formatDate(userProfile.lastLogin)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-[#131B2C] border border-white/5 rounded-xl p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-cyan-500/10 rounded-xl">
                                    <MessageSquare className="text-cyan-400" size={28} />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white">{stats.totalChats}</div>
                                    <div className="text-gray-400">Total Conversations</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#131B2C] border border-white/5 rounded-xl p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-emerald-500/10 rounded-xl">
                                    <MessageSquare className="text-emerald-400" size={28} />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white">{stats.totalMessages}</div>
                                    <div className="text-gray-400">Total Messages</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <div className="bg-[#131B2C] border border-white/5 rounded-xl p-6">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors w-full md:w-auto"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
