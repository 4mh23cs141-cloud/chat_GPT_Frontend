import React from 'react';
import {
    Activity,
    MessageSquare,
    Settings,
    Clock,
    TrendingUp,
    Shield,
    Zap,
    Users
} from 'lucide-react';

const Dashboard = () => {
    const stats = [
        { label: 'Total Messages', value: '1,284', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'AI Responses', value: '1,280', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        { label: 'Conversations', value: '42', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Community Rank', value: '#12', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    const recentActivity = [
        { id: 1, title: 'React Performance Audit', time: '2 hours ago', status: 'In Progress' },
        { id: 2, title: 'FastAPI Integration Fix', time: '5 hours ago', status: 'Completed' },
        { id: 3, title: 'Mesh Gradient CSS Design', time: 'Yesterday', status: 'Completed' },
        { id: 4, title: 'Auth Flow Refactoring', time: '2 days ago', status: 'Completed' },
    ];

    return (
        <div className="flex-1 flex flex-col p-6 lg:p-10 bg-[#f9f9f9] overflow-y-auto no-scrollbar">
            <div className="max-w-6xl mx-auto w-full">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Dashboard</h1>
                    <p className="text-gray-500 mt-1">Manage your account and view your recent chat activity.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${stat.bg}`}>
                                    <stat.icon size={24} className={stat.color} />
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Live</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Clock size={20} className="text-gray-400" />
                                    Recent Activity
                                </h3>
                                <button className="text-sm font-semibold text-black hover:underline transition-all">View All</button>
                            </div>
                            <div className="space-y-4">
                                {recentActivity.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100 group-hover:border-black transition-colors">
                                                <MessageSquare size={18} className="text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{item.title}</p>
                                                <p className="text-xs text-gray-400">{item.time}</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Quick Settings & Profile */}
                    <div className="space-y-6">
                        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Shield size={20} className="text-gray-400" />
                                Security Status
                            </h3>
                            <div className="p-4 bg-green-50 border border-green-100 rounded-2xl mb-6">
                                <p className="text-sm font-semibold text-green-800">Account is protected</p>
                                <p className="text-[11px] text-green-600 mt-1">Two-factor authentication is active and your recovery email is verified.</p>
                            </div>
                            <button className="w-full py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700 text-sm">
                                Review Security Settings
                            </button>
                        </section>

                        <section className="bg-black p-8 rounded-3xl shadow-lg relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-white mb-2">Upgrade to Pro</h3>
                                <p className="text-gray-400 text-sm mb-6">Get unlimited access to GPT-4o and faster response times.</p>
                                <button className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform">
                                    Start Free Trial
                                </button>
                            </div>
                            <Zap className="absolute -bottom-4 -right-4 text-white/10 w-32 h-32 group-hover:rotate-12 transition-transform duration-500" />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
