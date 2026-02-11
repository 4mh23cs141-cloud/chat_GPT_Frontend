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

// Inlined ChatMessage Component
const ChatMessage = ({ role, content }) => {
  const isUser = role === 'user';
  return (
    <div className={`w-full py-6 transition-all ${isUser ? '' : 'bg-transparent'}`}>
      <div className="max-w-3xl mx-auto flex gap-4 px-4 md:px-6">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isUser ? 'bg-gray-100 border border-gray-200' : 'bg-[#e7f8ff] text-[#10a37f]'
          }`}>
          {isUser ? <User size={18} className="text-gray-600" /> : <Sparkles size={18} />}
        </div>
        <div className="flex-1 space-y-2 overflow-hidden">
          <div className="font-semibold text-sm text-gray-800">
            {isUser ? 'You' : 'ChatGPT'}
          </div>
          <div className="text-[16px] leading-7 text-gray-700 whitespace-pre-wrap break-words">
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
      <div className="relative flex flex-col w-full bg-[#f4f4f4] rounded-[28px] p-2 transition-shadow focus-within:shadow-md">
        <textarea
          ref={textareaRef}
          rows="1"
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything"
          className="w-full bg-transparent outline-none px-4 py-3 text-lg text-gray-700 placeholder-gray-500 resize-none min-h-[56px] max-h-40"
          disabled={isLoading}
        />
        <div className="flex items-center justify-between px-2 pb-1">
          <div className="flex gap-1">
            <button className="p-2 hover:bg-gray-200 rounded-xl text-gray-600 transition-colors" title="Attach file">
              <Paperclip size={20} />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-xl text-gray-600 transition-colors" title="Search">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-xl text-gray-600 transition-colors" title="Reason">
              <Sparkles size={20} />
            </button>
          </div>
          <button
            onClick={onSend}
            disabled={!value.trim() || isLoading}
            className={`p-2.5 rounded-full transition-all shadow-sm ${value.trim() && !isLoading
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
      <p className="text-[11px] text-gray-400 text-center mt-3">
        SHIVA'S GPT can make mistakes. Check important info.
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
        replyText = `I'm SHIVA'S GPT. I received your message: "${userMessage.content}". How can I assist today?`;
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
    <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {isLanding ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <h1 className="text-4xl font-semibold text-gray-800 mb-10 tracking-tight">
              What can I help with?
            </h1>

            <ChatInput
              value={inputValue}
              setValue={setInputValue}
              onSend={handleSend}
              isLoading={isLoading}
            />

            <div className="flex flex-wrap gap-2 mt-8 justify-center max-w-2xl px-4">
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
        ) : (
          <div className="flex flex-col w-full">
            {messages.map((msg, index) => (
              <ChatMessage key={index} role={msg.role} content={msg.content} />
            ))}
            {isLoading && (
              <div className="max-w-3xl mx-auto w-full px-4 md:px-6 py-6 flex gap-4 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-gray-100 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-1/4" />
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {!isLanding && (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white to-transparent pt-10">
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
