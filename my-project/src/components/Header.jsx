import React from 'react';
import { ChevronDown, Share, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="h-14 flex items-center justify-between px-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
            <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors group">
                    <span className="font-semibold text-gray-800">SHIVA'S GPT</span>
                    <span className="text-gray-400 font-normal">Auto</span>
                    <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600" />
                </button>

                <nav className="hidden lg:flex items-center gap-1 ml-4 border-l border-gray-100 pl-4">
                    <Link to="/" className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-all">Home</Link>
                    <Link to="/about" className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-all">About</Link>
                    <Link to="/contact" className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-all">Contact</Link>
                </nav>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 mr-2">
                    <Link
                        to="/login"
                        className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Log in
                    </Link>
                    <Link
                        to="/signup"
                        className="px-3 py-1.5 text-sm font-medium bg-black text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        Sign up
                    </Link>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors" title="Share chat">
                    <Share size={18} />
                </button>
                <div className="w-8 h-8 rounded-full bg-[#f4f4f4] border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                    <User size={18} className="text-gray-600" />
                </div>
            </div>
        </header>
    );
};

export default Header;
