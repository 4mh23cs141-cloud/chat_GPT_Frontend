import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Chrome, Github, Loader2, AlertCircle, Cpu } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                if (data.access_token) localStorage.setItem('token', data.access_token);
                navigate('/');
            } else {
                setError(data.detail || 'Access Denied: Invalid credentials.');
            }
        } catch (err) {
            setError('System Failure: Server unreachable.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent text-white p-4">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[100px] rounded-full" />
            </div>

            <div className="w-full max-w-md bg-[#131B2C]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-indigo-600/30">
                        <Cpu className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Initialize Session</h1>
                    <p className="text-gray-500 text-sm mt-2">Welcome back to Nexus AI</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {error && (
                        <div className="flex items-center gap-2 p-3 text-xs text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 ml-1">Email Identifier</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-[#0B0F19] border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm text-white placeholder-gray-600"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-xs font-semibold text-gray-400">Passcode</label>
                            <a href="#" className="text-[10px] text-indigo-400 hover:text-indigo-300">Forgot?</a>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-[#0B0F19] border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm text-white placeholder-gray-600"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-200 transition-all shadow-lg mt-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : 'Connect'}
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                    <div className="relative flex justify-center"><span className="px-2 bg-[#131B2C] text-gray-500 text-[10px] uppercase tracking-wider">Or continue with</span></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-2.5 bg-[#0B0F19] border border-white/10 rounded-xl hover:bg-white/5 transition-all text-sm text-gray-300">
                        <Chrome size={18} /> Google
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2.5 bg-[#0B0F19] border border-white/10 rounded-xl hover:bg-white/5 transition-all text-sm text-gray-300">
                        <Github size={18} /> GitHub
                    </button>
                </div>

                <p className="text-center text-xs text-gray-500 mt-8">
                    New to Nexus? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold">Create account</Link>
                </p>
            </div>
        </div>
    );
};
export default Login;