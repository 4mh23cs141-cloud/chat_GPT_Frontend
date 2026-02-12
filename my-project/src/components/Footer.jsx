import React from 'react';
import { Twitter, Instagram, Github, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#080b12] border-t border-white/5 py-12 px-6 mt-auto text-gray-400">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-white">NEXUS AI</span>
                    <span className="text-xs text-gray-600">© 2026</span>
                </div>
                <div className="flex gap-6">
                    <Twitter size={18} className="hover:text-white cursor-pointer transition-colors" />
                    <Github size={18} className="hover:text-white cursor-pointer transition-colors" />
                    <Youtube size={18} className="hover:text-white cursor-pointer transition-colors" />
                </div>
                <div className="flex gap-6 text-xs font-medium">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                </div>
            </div>
        </footer>
    );
};
export default Footer;