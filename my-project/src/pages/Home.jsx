import React from "react";
import {
  Paperclip,
  Search,
  BookOpen,
  Image as ImageIcon,
  ArrowUp,
  Sparkles
} from "lucide-react";

const Home = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 bg-white relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-50 via-white to-white pointer-events-none" />

      {/* Main content */}
      <div className="w-full max-w-2xl relative z-10 flex flex-col items-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-10 tracking-tight">
          What can I help with?
        </h1>

        {/* Input box Container */}
        <div className="w-full bg-[#f4f4f4] rounded-3xl p-2 shadow-sm focus-within:shadow-md transition-shadow">
          <textarea
            rows="1"
            placeholder="Ask anything"
            className="w-full bg-transparent outline-none px-4 py-3 text-lg text-gray-700 placeholder-gray-500 resize-none min-h-[56px] max-h-40"
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />

          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex gap-1">
              <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors tooltip" title="Attach file">
                <Paperclip size={20} />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors" title="Search">
                <Search size={20} />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors" title="Reason">
                <Sparkles size={20} />
              </button>
            </div>

            <button className="bg-black text-white p-2.5 rounded-full hover:bg-gray-800 transition-colors shadow-sm">
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-8 justify-center">
          {[
            { label: "Create image", icon: ImageIcon },
            { label: "Summarize text", icon: BookOpen },
            { label: "Brainstorm", icon: Sparkles },
            { label: "Analyze data", icon: Search },
          ].map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Footer text */}
      <p className="absolute bottom-6 text-xs text-gray-400 text-center max-w-md z-10">
        By messaging ChatGPT, you agree to our <span className="underline cursor-pointer">Terms</span> and have read our <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default Home;
