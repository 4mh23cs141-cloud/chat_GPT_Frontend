import React from 'react';
import { User, Bell, Shield, Palette, Globe, Smartphone } from 'lucide-react';

const Settings = () => {
    const sections = [
        {
            title: 'Account',
            icon: User,
            items: ['Profile Information', 'Email Address', 'Password', 'Two-Factor Authentication']
        },
        {
            title: 'Appearance',
            icon: Palette,
            items: ['Theme Preferences', 'Font Size', 'Animations']
        },
        {
            title: 'Notifications',
            icon: Bell,
            items: ['Email Notifications', 'Push Notifications', 'Desktop Alerts']
        },
        {
            title: 'Security',
            icon: Shield,
            items: ['Login Activity', 'Connected Devices', 'API Keys']
        }
    ];

    return (
        <div className="flex-1 flex flex-col p-6 lg:p-10 bg-[#0B0F19] text-white overflow-y-auto custom-scrollbar">
            <div className="max-w-4xl mx-auto w-full">
                <header className="mb-12">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Settings</h1>
                    <p className="text-gray-500 mt-2 text-sm">Manage your account preferences and system configurations.</p>
                </header>

                <div className="space-y-6">
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-[#131B2C] rounded-2xl border border-white/5 overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex items-center gap-3">
                                <section.icon size={20} className="text-indigo-400" />
                                <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                            </div>
                            <div className="divide-y divide-white/5">
                                {section.items.map((item, i) => (
                                    <div key={i} className="p-4 sm:p-6 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                                        <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                        <button className="text-xs text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                            Edit
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-end">
                    <button className="px-6 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors text-sm font-medium">
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
