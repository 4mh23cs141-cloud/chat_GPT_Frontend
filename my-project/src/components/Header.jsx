import React from 'react';
import { ChevronDown, Share, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="h-14 flex items-center justify-between px-4 sticky top-0 bg-[#0B0F19]/80 backdrop-blur-md z-20 border-b border-white/5">
            <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors group">
                    <span className="font-semibold text-white">NEXUS AI</span>
                    <span className="text-gray-400 font-normal">Auto</span>
                    <ChevronDown size={14} className="text-gray-400 group-hover:text-white" />
                </button>

                <nav className="hidden lg:flex items-center gap-1 ml-4 border-l border-white/10 pl-4">
                    <Link to="/" className="px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">Home</Link>
                </nav>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 mr-2">
                    <Link
                        to="/login"
                        className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/10"
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
                <button className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors" title="Share chat">
                    <Share size={18} />
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/10 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                    <User size={18} className="text-white" />
                </div>
            </div>
        </header>
    );
};

export default Header;
