import React from 'react';
import { Info } from 'lucide-react';

const About = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white">
            <div className="max-w-xl w-full text-center">
                <Info size={48} className="mx-auto mb-6 text-gray-400" />
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">About ChatGPT</h1>
                <p className="text-gray-600 leading-relaxed">
                    This is a premium frontend implementation of a chat interface, designed to provide a smooth and intuitive user experience. Built with React, Tailwind CSS, and Lucide icons.
                </p>
            </div>
        </div>
    );
};

export default About;
