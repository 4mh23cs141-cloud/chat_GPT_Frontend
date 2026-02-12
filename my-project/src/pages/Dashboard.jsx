import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Activity,
    MessageSquare,
    Clock,
    TrendingUp,
    Shield,
    Zap,
    Cpu,
    Send,
    Loader2,
    Sparkles
} from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`http://127.0.0.1:8000/history?token=${token}`);
                if (response.ok) {
                    const data = await response.json();
                    setMessages(data.map(m => ({ role: m.role, text: m.content })));
                } else if (response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (err) {
                console.error("Dashboard history load failed:", err);
            } finally {
                setInitialLoading(false);
            }
        };

        fetchHistory();
    }, [navigate]);

    useEffect(() => {
        if (!initialLoading) scrollToBottom();
    }, [messages, initialLoading]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const token = localStorage.getItem('token');
        const userMsg = input;
        setMessages(prev => [...prev, { role: "user", text: userMsg }]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch(`http://127.0.0.1:8000/ask?token=${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg, system_prompt: "You are the Nexus Control Center Assistant." })
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(prev => [...prev, { role: "model", text: data.response }]);
            } else {
                throw new Error("Neural transmission failed");
            }
        } catch (e) {
            setMessages(prev => [...prev, { role: "model", text: "⚠️ Error in neural processing." }]);
        } finally {
            setLoading(false);
        }
    };

    const stats = [
        { label: 'Total Messages', value: messages.length.toString(), icon: MessageSquare, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
        { label: 'Neural Power', value: '98%', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
        { label: 'Chat Sessions', value: '1', icon: Activity, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { label: 'Rank', value: '#12', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    ];

    return (
        <div className="flex-1 flex flex-col p-6 lg:p-10 bg-[#0B0F19] text-white overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto w-full">
                <header className="mb-12">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Command Center</h1>
                    <p className="text-gray-500 mt-2 text-sm">Nexus AI System Status & Control</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-[#131B2C] p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <stat.icon size={64} className={stat.color} />
                            </div>
                            <div className="flex items-center justify-between mb-4 relative z-10">
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon size={22} className={stat.color} />
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider border border-white/10 px-2 py-0.5 rounded-full">Live</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white relative z-10">{stat.value}</h3>
                            <p className="text-xs font-medium text-gray-400 mt-1 relative z-10 uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Integrated Chat Section */}
                    <div className="lg:col-span-2 flex flex-col bg-[#131B2C] rounded-3xl border border-white/5 overflow-hidden h-[500px]">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Cpu size={18} className="text-indigo-400" />
                                Nexus Core Interface
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Synced</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.role === 'user'
                                        ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-100'
                                        : 'bg-white/5 border border-white/10 text-gray-300'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin text-indigo-400" />
                                        <span className="text-xs text-gray-500">Processing...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 bg-[#0B0F19]/50 border-t border-white/5">
                            <div className="relative flex items-center gap-2">
                                <input
                                    className="flex-1 bg-[#131B2C] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder-gray-600"
                                    placeholder="Input command..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={loading || !input.trim()}
                                    className="p-3 bg-white text-black rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Info Column */}
                    <div className="space-y-6">
                        <section className="bg-gradient-to-br from-indigo-900 to-[#131B2C] p-8 rounded-3xl border border-white/10 relative overflow-hidden">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/30 blur-[60px] rounded-full" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <Shield size={20} className="text-indigo-300" />
                                    <h3 className="text-lg font-bold text-white">Security</h3>
                                </div>
                                <div className="p-4 bg-black/20 border border-white/10 rounded-2xl mb-6 backdrop-blur-md">
                                    <p className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                                        Active
                                    </p>
                                    <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">Neural firewall is operational. Encryption at 256-bit.</p>
                                </div>
                                <button className="w-full py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-all font-semibold text-gray-300 text-sm">
                                    Audit System
                                </button>
                            </div>
                        </section>

                        <section className="bg-white text-black p-8 rounded-3xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black mb-2 flex items-center gap-2">
                                    <Sparkles size={20} className="text-indigo-600" />
                                    Nexus Pro
                                </h3>
                                <p className="text-gray-600 text-sm mb-6">Experience the future of thought.</p>
                                <button className="w-full py-3 bg-black text-white rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform">
                                    Upgrade
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;