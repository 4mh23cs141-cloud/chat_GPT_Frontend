import React from 'react';
import { Cpu, Zap, Shield } from 'lucide-react';
import Header from "../components/Header";
import Footer from '../components/Footer';

const About = () => {
    return (
        <div className="flex-1 flex flex-col bg-[#0B0F19] text-white overflow-y-auto">
            <div className="flex-1 flex flex-col items-center justify-center p-12 min-h-[60vh]">
                <div className="max-w-2xl w-full text-center">
                    <div className="w-16 h-16 mx-auto mb-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/20">
                        <Cpu size={32} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-6">About Nexus</h1>
                    <p className="text-gray-400 text-lg leading-relaxed mb-12">
                        Nexus is a next-generation AI interface designed to bridge the gap between human creativity and machine intelligence. Built with precision, speed, and aesthetics in mind.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Zap, title: "Lightning Fast", desc: "Powered by Gemini 1.5 Flash" },
                            { icon: Shield, title: "Secure", desc: "Enterprise grade encryption" },
                            { icon: Cpu, title: "Advanced", desc: "State of the art reasoning" }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-[#131B2C] border border-white/5 rounded-xl">
                                <item.icon className="mx-auto mb-3 text-indigo-400" size={24} />
                                <h3 className="font-bold mb-1">{item.title}</h3>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default About;