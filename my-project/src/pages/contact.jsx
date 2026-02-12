import React from 'react';
import { Mail } from 'lucide-react';
import Footer from '../components/Footer';

const Contact = () => {
    return (
        <div className="flex-1 flex flex-col bg-[#0B0F19] text-white overflow-y-auto">
            <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[60vh]">
                <div className="max-w-md w-full text-center bg-[#131B2C] p-10 rounded-3xl border border-white/5 shadow-2xl">
                    <Mail size={48} className="mx-auto mb-6 text-indigo-400" />
                    <h1 className="text-3xl font-bold text-white mb-4">Get in Touch</h1>
                    <p className="text-gray-400 mb-8">
                        Have questions or feedback about Nexus? We are always listening.
                    </p>
                    <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all shadow-lg w-full">
                        Contact Support
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Contact;