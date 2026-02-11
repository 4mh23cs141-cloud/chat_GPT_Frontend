import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Chrome, Github, Loader2 } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    
    // 1. State for form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '' // Included for UI, though your API currently only asks for email/pass
    });

    // 2. State for UI feedback
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 3. Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success! Redirect to login or home
                navigate('/login');
            } else {
                // Display error from server (e.g., "Email already registered")
                setError(data.detail || 'Signup failed. Please try again.');
            }
        } catch (err) {
            setError('Could not connect to the server. Is your backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#f9f9f9]">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
                    <p className="text-gray-500">Join SHIVA'S GPT to start chatting</p>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-4 mb-6">
                    <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700">
                        <Chrome size={20} className="text-red-500" />
                        Sign up with Google
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700">
                        <Github size={20} className="text-gray-900" />
                        Sign up with GitHub
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

                {/* Form starts here */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 px-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-black outline-none transition-all text-gray-800"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 px-1">Email address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-black outline-none transition-all text-gray-800"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 px-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
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
                        {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : 'Create account'}
                    </button>
                </form>

                <p className="text-center text-[11px] text-gray-400 mt-6 px-4">
                    By clicking "Create account", you agree to our Terms of Service and Privacy Policy.
                </p>

                <p className="text-center text-sm text-gray-500 mt-8">
                    Already have an account? <Link to="/login" className="text-black font-semibold hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;