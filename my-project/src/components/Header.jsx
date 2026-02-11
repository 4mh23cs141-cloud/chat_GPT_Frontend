import React from 'react';
import { ChevronDown, Share, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="h-16 flex items-center justify-between px-6 sticky top-0 bg-black backdrop-blur-xl border-b border-white/10 shadow-lg z-50 transition-all duration-300">
            <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-white/10 transition-colors group">
                    <span className="font-semibold text-white">SHIVA'S GPT</span>
                    <span className="text-gray-400 font-normal">Auto</span>
                    <ChevronDown size={14} className="text-gray-400 group-hover:text-white" />
                </button>

                <nav className="hidden lg:flex items-center gap-1 ml-4 border-l border-white/10 pl-4">
                    <Link to="/" className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all">Home</Link>
                    <Link to="/about" className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all">About</Link>
                    <Link to="/contact" className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all">Contact</Link>
                    <Link to="/dashboard" className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all">Dashboard</Link>
                </nav>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 mr-2">
                    <Link
                        to="/login"
                        className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        Log in
                    </Link>
                    <Link
                        to="/signup"
                        className="px-3 py-1.5 text-sm font-medium bg-white text-black hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Sign up
                    </Link>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-xl text-gray-300 transition-colors" title="Share chat">
                    <Share size={18} />
                </button>
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                    <User size={18} className="text-white" />
                </div>
            </div>
        </header>
    );
};

export default Header;
