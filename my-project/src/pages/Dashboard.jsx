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
        // Check authentication (optional - remove if not needed)
        const token = localStorage.getItem('token');
        if (!token) {
            // Optionally redirect to login or just continue
            // navigate('/login');
        }
        setInitialLoading(false);
    }, [navigate]);

    useEffect(() => {
        if (!initialLoading) scrollToBottom();
    }, [messages, initialLoading]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: "user", text: userMsg }]);
        setInput("");
        setLoading(true);

        console.log("=== Dashboard AI Request Started ===");
        console.log("User message:", userMsg);

        try {
            // Import AI service dynamically
            console.log("Importing AI service...");
            const { getAIResponse } = await import('../services/aiService');
            console.log("AI service imported successfully");

            // Get real AI response from Gemini
            console.log("Calling getAIResponse...");
            const aiResponseText = await getAIResponse(
                userMsg,
                "You are the Nexus Control Center Assistant. Provide helpful, accurate responses with technical expertise."
            );

            console.log("AI Response received:", aiResponseText);
            setMessages(prev => [...prev, { role: "model", text: aiResponseText }]);
            console.log("=== Dashboard AI Request Completed Successfully ===");
        } catch (error) {
            console.error("=== Dashboard AI Request Failed ===");
            console.error("Error details:", error);
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);

            setMessages(prev => [...prev, {
                role: "model",
                text: `⚠️ ${error.message || "Neural processing error. Please try again."}`
            }]);
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-[#131B2C] p-5 sm:p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <stat.icon size={48} className={`${stat.color} sm:w-16 sm:h-16`} />
                            </div>
                            <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
                                <div className={`p-2.5 sm:p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon size={20} className={`${stat.color} sm:w-[22px] sm:h-[22px]`} />
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider border border-white/10 px-2 py-0.5 rounded-full">Live</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white relative z-10">{stat.value}</h3>
                            <p className="text-xs font-medium text-gray-400 mt-1 relative z-10 uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Integrated Chat Section */}
                    <div className="lg:col-span-2 flex flex-col bg-[#131B2C] rounded-3xl border border-white/5 overflow-hidden h-[450px] sm:h-[500px]">
                        <div className="p-4 sm:p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                <Cpu size={16} className="text-indigo-400 sm:w-[18px] sm:h-[18px]" />
                                <span className="hidden sm:inline">Nexus Core Interface</span>
                                <span className="sm:hidden">Ask AI</span>
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Synced</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 custom-scrollbar">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-2xl text-xs sm:text-sm ${msg.role === 'user'
                                        ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-100'
                                        : 'bg-white/5 border border-white/10 text-gray-300'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 p-3 sm:p-4 rounded-2xl flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin text-indigo-400" />
                                        <span className="text-xs text-gray-500">Processing...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-3 sm:p-4 bg-[#0B0F19]/50 border-t border-white/5">
                            <div className="relative flex items-center gap-2">
                                <input
                                    className="flex-1 bg-[#131B2C] border border-white/10 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder-gray-600"
                                    placeholder="Ask AI anything..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={loading || !input.trim()}
                                    className="p-2.5 sm:p-3 bg-white text-black rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 touch-manipulation"
                                >
                                    <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Info Column */}
                    <div className="space-y-4 sm:space-y-6">
                        <section className="bg-gradient-to-br from-indigo-900 to-[#131B2C] p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/30 blur-[60px] rounded-full" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <Shield size={18} className="text-indigo-300 sm:w-5 sm:h-5" />
                                    <h3 className="text-base sm:text-lg font-bold text-white">Security</h3>
                                </div>
                                <div className="p-4 bg-black/20 border border-white/10 rounded-2xl mb-4 sm:mb-6 backdrop-blur-md">
                                    <p className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                                        Active
                                    </p>
                                    <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">Neural firewall is operational. Encryption at 256-bit.</p>
                                </div>
                                <button className="w-full py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-all font-semibold text-gray-300 text-sm touch-manipulation">
                                    Audit System
                                </button>
                            </div>
                        </section>

                        <section className="bg-white text-black p-6 sm:p-8 rounded-3xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-lg sm:text-xl font-black mb-2 flex items-center gap-2">
                                    <Sparkles size={18} className="text-indigo-600 sm:w-5 sm:h-5" />
                                    Nexus Pro
                                </h3>
                                <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">Experience the future of thought.</p>
                                <button className="w-full py-3 bg-black text-white rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform touch-manipulation">
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