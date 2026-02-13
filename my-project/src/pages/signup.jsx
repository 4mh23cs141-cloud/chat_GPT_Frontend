import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Chrome, Github, Loader2, Cpu } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '', fullName: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://127.0.0.1:8000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });
            const data = await response.json();
            if (response.ok) navigate('/login');
            else setError(data.detail || 'Registration failed.');
        } catch (err) {
            setError('Server connection failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent text-white p-4">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[100px] rounded-full" />
            </div>

            <div className="w-full max-w-md bg-[#131B2C]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-purple-600/30">
                        <Cpu className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Join Nexus</h1>
                    <p className="text-gray-500 text-sm mt-2">Create your AI workspace</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {error && <div className="p-3 text-xs text-red-400 bg-red-500/10 rounded-lg border border-red-500/20">{error}</div>}

                    <div className="space-y-1">
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full pl-10 pr-4 py-3 bg-[#0B0F19] border border-white/10 rounded-xl focus:border-purple-500 outline-none text-sm text-white placeholder-gray-600" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Email" className="w-full pl-10 pr-4 py-3 bg-[#0B0F19] border border-white/10 rounded-xl focus:border-purple-500 outline-none text-sm text-white placeholder-gray-600" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="Password" className="w-full pl-10 pr-4 py-3 bg-[#0B0F19] border border-white/10 rounded-xl focus:border-purple-500 outline-none text-sm text-white placeholder-gray-600" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-200 transition-all shadow-lg mt-2">
                        {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-500 mt-6">
                    Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">Log in</Link>
                </p>
            </div>
        </div>
    );
};
export default Signup;