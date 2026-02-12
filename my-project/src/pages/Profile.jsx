import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Mail,
    Shield,
    Bell,
    Moon,
    Globe,
    CreditCard,
    ChevronRight,
    Camera,
    Save,
    X,
    Loader2,
    AlertCircle
} from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();

    // --- State Management ---
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [userData, setUserData] = useState({
        name: "User",
        email: "",
        plan: "Pro Plan",
        joinedDate: "February 2026"
    });

    const [settings, setSettings] = useState({
        appearance: "Dark Mode",
        notifications: "Enabled",
        language: "English (US)",
        twoFactor: "Disabled"
    });

    // --- Fetch User Data ---
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData({
                        name: data.full_name || data.email?.split('@')[0] || "User",
                        email: data.email || "",
                        plan: data.plan || "Pro Plan",
                        joinedDate: data.created_at ? new Date(data.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "February 2026"
                    });
                } else if (response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    console.warn("Profile endpoint not found, using session data.");
                    setUserData(prev => ({ ...prev, email: "user@example.com" }));
                }
            } catch (err) {
                console.error("Failed to fetch profile:", err);
                setError("Could not connect to the server. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    // --- Handlers ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const toggleSetting = (key, options) => {
        const currentIndex = options.indexOf(settings[key]);
        const nextIndex = (currentIndex + 1) % options.length;
        setSettings(prev => ({ ...prev, [key]: options[nextIndex] }));
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you absolutely sure you want to delete your account? This action cannot be undone.")) {
            alert("Account deletion request submitted.");
        }
    };

    const handleCameraClick = () => {
        alert("Profile picture upload feature coming soon!");
    };

    if (loading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#fafafa]">
                <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
                <p className="text-gray-500 mt-4 font-medium">Loading your profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#fafafa] p-6 text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Oops! Something went wrong</h2>
                <p className="text-gray-500 mt-2 max-w-sm">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
                >
                    Retry
                </button>
            </div>
        );
    }

    // --- UI Sections Definition ---
    const sections = [
        {
            title: "Personal Information",
            items: [
                { icon: User, label: "Name", value: userData.name, editable: true, name: "name" },
                { icon: Mail, label: "Email", value: userData.email, editable: true, name: "email" },
                {
                    icon: Globe,
                    label: "Language",
                    value: settings.language,
                    onClick: () => toggleSetting("language", ["English (US)", "Hindi", "Spanish", "French"])
                },
            ]
        },
        {
            title: "Preferences",
            items: [
                {
                    icon: Moon,
                    label: "Appearance",
                    value: settings.appearance,
                    onClick: () => toggleSetting("appearance", ["Dark Mode", "Light Mode", "System"])
                },
                {
                    icon: Bell,
                    label: "Notifications",
                    value: settings.notifications,
                    onClick: () => toggleSetting("notifications", ["Enabled", "Disabled", "Priority Only"])
                },
            ]
        },
        {
            title: "Security & Billing",
            items: [
                {
                    icon: Shield,
                    label: "Two-Factor Auth",
                    value: settings.twoFactor,
                    onClick: () => toggleSetting("twoFactor", ["Enabled", "Disabled"])
                },
                {
                    icon: CreditCard,
                    label: "Subscription",
                    value: userData.plan,
                    onClick: () => alert("Redirecting to billing portal...")
                },
            ]
        }
    ];

    return (
        <div className="flex-1 overflow-y-auto bg-[#fafafa]">
            <div className="max-w-4xl mx-auto py-12 px-6">
                <div className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
                        <p className="text-gray-500 mt-2">Manage your account settings and preferences.</p>
                    </div>
                </div>

                {/* Profile Header Card */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 mb-8">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-white text-3xl font-bold uppercase transition-all">
                            {userData.name ? userData.name[0] : "?"}
                        </div>
                        <button
                            onClick={handleCameraClick}
                            className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                            <Camera size={16} className="text-gray-600" />
                        </button>
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                            <span className="px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
                                {userData.plan}
                            </span>
                            <span className="text-sm text-gray-500">
                                Joined {userData.joinedDate}
                            </span>
                        </div>
                    </div>
                    <div className="md:ml-auto flex gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all border border-gray-200"
                                >
                                    <X size={18} />
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex items-center gap-2 px-6 py-2 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-all shadow-md"
                                >
                                    <Save size={18} />
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-2.5 bg-gray-50 text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all border border-gray-200"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Settings Sections */}
                <div className="space-y-6">
                    {sections.map((section) => (
                        <div key={section.title} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                            <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/50">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{section.title}</h3>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {section.items.map((item) => (
                                    <div
                                        key={item.label}
                                        onClick={!isEditing && item.onClick ? item.onClick : undefined}
                                        className={`w-full flex items-center justify-between px-8 py-5 transition-colors group ${!isEditing && item.onClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                                    >
                                        <div className="flex items-center gap-4 w-full mr-4">
                                            <div className="p-2.5 bg-gray-100 rounded-xl text-gray-600 group-hover:bg-white group-hover:shadow-sm transition-all flex-shrink-0">
                                                <item.icon size={20} />
                                            </div>
                                            <div className="text-left w-full">
                                                <p className="text-sm font-bold text-gray-900">{item.label}</p>
                                                {isEditing && item.editable ? (
                                                    <input
                                                        type="text"
                                                        name={item.name}
                                                        value={item.value}
                                                        onChange={handleInputChange}
                                                        className="mt-1 w-full max-w-md px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black text-sm"
                                                    />
                                                ) : (
                                                    <p className="text-sm text-gray-500">{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                        {!isEditing && (item.onClick || item.editable) && (
                                            <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-900 transition-colors flex-shrink-0" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center text-gray-400">
                    <p className="text-sm">Account ID: SHIVA-GPT-777-12345</p>
                    <button
                        onClick={handleDeleteAccount}
                        className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
