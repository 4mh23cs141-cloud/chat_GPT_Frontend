import React, { useState, useRef, useEffect } from "react";
import {
  ImageIcon,
  BookOpen,
  Sparkles,
  Search,
  Plus,
  Paperclip,
  ArrowUp,
  User
} from "lucide-react";
import Header from "../components/Header";

// Inlined ChatMessage Component
const ChatMessage = ({ role, content }) => {
  const isUser = role === 'user';
  return (
    <div className={`w-full py-6 transition-all ${isUser ? '' : 'bg-white/5'}`}>
      <div className="max-w-3xl mx-auto flex gap-4 px-4 md:px-6">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isUser ? 'bg-white/10 border border-white/5' : 'bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg shadow-purple-500/20'
          }`}>
          {isUser ? <User size={18} className="text-gray-300" /> : <Sparkles size={18} />}
        </div>
        <div className="flex-1 space-y-2 overflow-hidden">
          <div className="font-semibold text-sm text-gray-200">
            {isUser ? 'You' : 'Nexus AI'}
          </div>
          <div className="text-[16px] leading-7 text-gray-300 whitespace-pre-wrap break-words">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

// Inlined ChatInput Component
const ChatInput = ({ onSend, value, setValue, isLoading }) => {
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSend();
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4 md:pb-6">
      <div className="relative flex flex-col w-full bg-[#1e293b]/50 backdrop-blur-xl border border-white/10 rounded-[28px] p-2 transition-all focus-within:bg-[#1e293b]/80 focus-within:border-white/20 focus-within:shadow-xl shadow-lg shadow-black/20">
        <textarea
          ref={textareaRef}
          rows="1"
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          className="w-full bg-transparent outline-none px-4 py-3 text-lg text-white placeholder-gray-500 resize-none min-h-[56px] max-h-40"
          disabled={isLoading}
        />
        <div className="flex items-center justify-between px-2 pb-1">
          <div className="flex gap-1">
            <button className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors" title="Attach file">
              <Paperclip size={20} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors" title="Search">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors" title="Reason">
              <Sparkles size={20} />
            </button>
          </div>
          <button
            onClick={onSend}
            disabled={!value.trim() || isLoading}
            className={`p-2.5 rounded-full transition-all shadow-lg ${value.trim() && !isLoading
              ? 'bg-white text-black hover:bg-gray-200 hover:scale-105 active:scale-95'
              : 'bg-white/10 text-gray-500 cursor-not-allowed'
              }`}
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
      <p className="text-[11px] text-gray-500 text-center mt-3">
        Nexus AI can make mistakes. Check important info.
      </p>
    </div>
  );
};

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const userText = userMessage.content.trim().toLowerCase();

      let replyText = "";

      if (userText === "i am sanjay") {
        replyText = "PS HULI, how can I assist today?";
      } else {
        replyText = `I'm NEXUS AI. I received your message: "${userMessage.content}". How can I assist today?`;
      }

      const aiMessage = {
        role: "assistant",
        content: replyText,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };


  const isLanding = messages.length === 0;

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent relative overflow-hidden">
      <Header />

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {isLanding ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-tight text-center drop-shadow-2xl">
              What can I help with?
            </h1>

            <ChatInput
              value={inputValue}
              setValue={setInputValue}
              onSend={handleSend}
              isLoading={isLoading}
            />

            <div className="flex flex-wrap gap-3 mt-8 justify-center max-w-2xl px-4">
              {[
                { label: "Create image", icon: ImageIcon },
                { label: "Summarize text", icon: BookOpen },
                { label: "Brainstorm", icon: Sparkles },
                { label: "Analyze data", icon: Search },
              ].map((item) => (
                <button
                  key={item.label}
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-white/10 rounded-full text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all shadow-sm backdrop-blur-sm"
                >
                  <item.icon size={16} className="text-indigo-400" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            {messages.map((msg, index) => (
              <ChatMessage key={index} role={msg.role} content={msg.content} />
            ))}
            {isLoading && (
              <div className="max-w-3xl mx-auto w-full px-4 md:px-6 py-6 flex gap-4 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/10 rounded w-1/4" />
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {!isLanding && (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0B0F19] via-[#0B0F19] to-transparent pt-10">
          <ChatInput
            value={inputValue}
            setValue={setInputValue}
            onSend={handleSend}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
