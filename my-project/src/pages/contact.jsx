import React from 'react';
import { Mail } from 'lucide-react';
import Footer from '../components/Footer';

const Contact = () => {
    return (
        <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white min-h-[60vh]">
                <div className="max-w-xl w-full text-center">
                    <Mail size={48} className="mx-auto mb-6 text-gray-400" />
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">Get in Touch</h1>
                    <p className="text-gray-600 mb-8">
                        Have questions or feedback? We'd love to hear from you.
                    </p>
                    <button className="px-6 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-all shadow-sm">
                        Contact Support
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
