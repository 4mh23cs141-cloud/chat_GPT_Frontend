import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Chrome, Github, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // New state for success message

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://127.0.0.1:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Login successful!'); // Set success message
                
                if (data.access_token) {
                    localStorage.setItem('token', data.access_token);
                }
                
                // Wait 1.5 seconds so the user sees the success message before redirecting
                setTimeout(() => {
                    navigate('/chat');
                }, 1500);
            } else {
                // Set custom failed message
                setError(data.detail || 'Login failed: Invalid email or password');
            }
        } catch (err) {
            setError('Login failed: Server connection failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#f9f9f9]">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
                    <p className="text-gray-500">Log in to your SHIVA'S GPT account to continue</p>
                </div>

                <div className="space-y-4 mb-6">
                    <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700">
                        <Chrome size={20} className="text-red-500" />
                        Continue with Google
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700">
                        <Github size={20} className="text-gray-900" />
                        Continue with GitHub
                    </button>
                </div>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-400 uppercase tracking-wider text-[10px] font-bold">OR</span>
                    </div>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    
                    {/* Display Login Failed Message */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 mb-2">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Display Login Successful Message */}
                    {success && (
                        <div className="flex items-center gap-2 p-3 text-sm text-green-600 bg-green-50 rounded-xl border border-green-100 mb-2">
                            <CheckCircle2 size={18} />
                            <span>{success}</span>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 px-1">Email address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="name@example.com"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-black outline-none transition-all text-gray-800"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-gray-600 px-1">Password</label>
                            <a href="#" className="text-[10px] font-bold text-gray-400 hover:text-black uppercase">Forgot?</a>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-black outline-none transition-all text-gray-800"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-md mt-2 disabled:bg-gray-400"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : 'Continue'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-8">
                    Don't have an account? <Link to="/signup" className="text-black font-semibold hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;