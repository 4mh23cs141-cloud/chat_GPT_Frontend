import React from 'react';
import { Twitter, Instagram, Github, Youtube } from 'lucide-react';

const Footer = () => {
    const footerLinks = [
        {
            title: "Our products",
            links: ["ChatGPT", "OpenAI o1", "OpenAI o1-mini", "Sora"]
        },
        {
            title: "Our company",
            links: ["About us", "News", "Charter", "Security"]
        },
        {
            title: "Support",
            links: ["Help center", "API reference", "Community", "Status"]
        }
    ];

    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6 mt-auto">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Socials</h3>
                        <div className="flex gap-4">
                            <Twitter size={20} className="text-gray-400 hover:text-gray-900 cursor-pointer transition-colors" />
                            <Instagram size={20} className="text-gray-400 hover:text-gray-900 cursor-pointer transition-colors" />
                            <Github size={20} className="text-gray-400 hover:text-gray-900 cursor-pointer transition-colors" />
                            <Youtube size={20} className="text-gray-400 hover:text-gray-900 cursor-pointer transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 gap-4">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-xl text-gray-900">ChatGPT</span>
                        <span className="text-gray-400 text-sm">© 2026 OpenAI Replica</span>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="text-xs text-gray-400 hover:text-gray-600">Privacy policy</a>
                        <a href="#" className="text-xs text-gray-400 hover:text-gray-600">Terms of use</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
