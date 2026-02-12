import React from 'react';
import { User, Search, Plus, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = ({ isSidebarOpen }) => {
    return (
        <header className={`h-16 flex items-center justify-between px-6 bg-[#0B0F19]/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 transition-all duration-300`}>
            {/* Left side spacer to balance layout or show breadcrumbs */}
            <div className="flex items-center gap-3">
                 {/* Mobile Toggle would go here */}
            </div>

            {/* Center: Model Selector */}
            <div className="flex items-center gap-2 px-4 py-1.5 bg-[#131B2C] border border-white/10 rounded-full shadow-inner cursor-pointer hover:bg-white/5 transition-colors">
                <Sparkles size={14} className="text-indigo-400" />
                <span className="text-xs font-semibold text-gray-200">Gemini 1.5 Flash</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 rounded uppercase font-bold">PRO</span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                <Link to="/profile" className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-lg hover:opacity-90 transition-opacity">
                    U
                </Link>
            </div>
        </header>
    );
};

export default Header;