import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Chrome, Github } from 'lucide-react';

const Login = () => {
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

                <form className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 px-1">Email address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
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
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-black outline-none transition-all text-gray-800"
                            />
                        </div>
                    </div>

                    <button className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-md mt-2">
                        Continue
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
