import React from 'react';
import { LayoutGrid, BookOpen, Clock, Star } from 'lucide-react';

const Library = () => {
    return (
        <div className="flex-1 flex flex-col p-6 lg:p-10 bg-[#0B0F19] text-white overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto w-full">
                <header className="mb-12">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Library</h1>
                    <p className="text-gray-500 mt-2 text-sm">Your saved prompts, conversations, and assets.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Placeholder Content */}
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="bg-[#131B2C] p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                                    <BookOpen size={20} />
                                </div>
                                <span className="text-xs text-gray-500">2 days ago</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                Project Research {item}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-2">
                                Comprehensive analysis of the latest trends in AI interface design and user experience patterns.
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <span className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5">Research</span>
                                <span className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5">AI</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-col items-center justify-center py-12 border border-dashed border-white/10 rounded-3xl bg-white/5">
                    <div className="p-4 bg-white/5 rounded-full mb-4">
                        <Star size={32} className="text-gray-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Build Your Collection</h3>
                    <p className="text-gray-400 text-sm max-w-md text-center">
                        Save your best generations and organize them into collections for easy access.
                    </p>
                    <button className="mt-6 px-6 py-2.5 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-colors">
                        Create Collection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Library;
