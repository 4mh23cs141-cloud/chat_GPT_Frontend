import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import ChatMessage from "../components/ChatMessage";
// Utility functions for chat session management
const ChatSessionManager = {
  // Get all chat sessions
  getAllSessions: () => {
    const sessions = localStorage.getItem('nexus_chat_sessions');
    return sessions ? JSON.parse(sessions) : [];
  },

  // Save a chat session
  saveSession: (messages) => {
    if (messages.length === 0) return null;

    const sessions = ChatSessionManager.getAllSessions();
    const sessionId = Date.now().toString();

    // Get title from first user message
    const firstUserMessage = messages.find(m => m.role === 'user');
    const title = firstUserMessage
      ? firstUserMessage.content.substring(0, 50) + (firstUserMessage.content.length > 50 ? '...' : '')
      : 'New Chat';

    const newSession = {
      id: sessionId,
      title,
      messages,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messageCount: messages.length
    };

    sessions.unshift(newSession); // Add to beginning
    localStorage.setItem('nexus_chat_sessions', JSON.stringify(sessions));
    return sessionId;
  },

  // Get a specific session
  getSession: (sessionId) => {
    const sessions = ChatSessionManager.getAllSessions();
    return sessions.find(s => s.id === sessionId);
  },

  // Update current session
  updateCurrentSession: (sessionId, messages) => {
    const sessions = ChatSessionManager.getAllSessions();
    const index = sessions.findIndex(s => s.id === sessionId);

    if (index !== -1) {
      sessions[index].messages = messages;
      sessions[index].updatedAt = new Date().toISOString();
      sessions[index].messageCount = messages.length;
      localStorage.setItem('nexus_chat_sessions', JSON.stringify(sessions));
    }
  },

  // Delete a session
  deleteSession: (sessionId) => {
    const sessions = ChatSessionManager.getAllSessions();
    const filtered = sessions.filter(s => s.id !== sessionId);
    localStorage.setItem('nexus_chat_sessions', JSON.stringify(filtered));
  }
};

// Header imported above

// Inlined ChatInput Component
const ChatInput = ({ onSend, value, setValue, isLoading, onAttachment }) => {
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isReasoningActive, setIsReasoningActive] = useState(false);

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
        onSend({ search: isSearchActive, reasoning: isReasoningActive });
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onAttachment) {
      onAttachment(file);
    }
    // Reset input so same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 pb-4 md:pb-6">
      <div className="relative flex flex-col w-full bg-[#1e293b]/50 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-[28px] p-2 transition-all focus-within:bg-[#1e293b]/80 focus-within:border-white/20 focus-within:shadow-xl shadow-lg shadow-black/20">
        <textarea
          ref={textareaRef}
          rows="1"
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          className="w-full bg-transparent outline-none px-3 sm:px-4 py-3 text-base sm:text-lg text-white placeholder-gray-500 resize-none min-h-[52px] sm:min-h-[56px] max-h-40"
          disabled={isLoading}
        />
        <div className="flex items-center justify-between px-2 pb-1">
          <div className="flex gap-1">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors"
              title="Attach file"
            >
              <Paperclip size={20} />
            </button>
            <button
              onClick={() => setIsSearchActive(!isSearchActive)}
              className={`p-2 rounded-xl transition-colors ${isSearchActive ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}
              title="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsReasoningActive(!isReasoningActive)}
              className={`p-2 rounded-xl transition-colors ${isReasoningActive ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}
              title="Reason"
            >
              <Sparkles size={20} />
            </button>
          </div>
          <button
            onClick={() => onSend({ search: isSearchActive, reasoning: isReasoningActive })}
            disabled={!value.trim() || isLoading}
            className={`p-2 sm:p-2.5 rounded-full transition-all shadow-lg touch-manipulation ${value.trim() && !isLoading
              ? 'bg-white text-black hover:bg-gray-200 active:scale-95'
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
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('nexus_chat_history');
    const savedSessionId = localStorage.getItem('nexus_current_session');

    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed);
        setCurrentSessionId(savedSessionId);
        console.log("Loaded chat history from localStorage:", parsed.length, "messages");
      } catch (error) {
        console.error("Failed to load chat history:", error);
      }
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('nexus_chat_history', JSON.stringify(messages));

      // Update session if exists, or create new one
      if (currentSessionId) {
        ChatSessionManager.updateCurrentSession(currentSessionId, messages);
      }

      console.log("Saved chat history to localStorage:", messages.length, "messages");
    }
  }, [messages, currentSessionId]);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    };

    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, isLoading]);

  // Listen for new chat event from sidebar
  useEffect(() => {
    const handleNewChat = () => {
      // Save current chat to sessions if it has messages
      if (messages.length > 0) {
        const sessionId = ChatSessionManager.saveSession(messages);
        console.log("Saved current chat to session:", sessionId);
      }

      // Clear current chat
      setMessages([]);
      setInputValue("");
      setCurrentSessionId(null);
      localStorage.removeItem('nexus_chat_history');
      localStorage.removeItem('nexus_current_session');

      console.log("Started new chat");
    };

    window.addEventListener('nexus:new-chat', handleNewChat);
    return () => window.removeEventListener('nexus:new-chat', handleNewChat);
  }, [messages]);

  const handleSend = async (textOverride = null, options = {}) => {
    const textToSend = typeof textOverride === 'string' ? textOverride : inputValue;

    if (!textToSend.trim()) return;

    let finalContent = textToSend;
    // Append capability indicators to the user message content locally for visibility
    // In a real app, these would probably be system instructions or flags sent to the API
    if (options.search) finalContent = `[Web Search] ${finalContent}`;
    if (options.reasoning) finalContent = `[Reasoning] ${finalContent}`;

    const userMessage = { role: "user", content: finalContent };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Create session ID on first message
    if (!currentSessionId && messages.length === 0) {
      const newSessionId = Date.now().toString();
      setCurrentSessionId(newSessionId);
      localStorage.setItem('nexus_current_session', newSessionId);
    }

    console.log("=== AI Request Started ===");
    console.log("User message:", userMessage.content);

    try {
      console.log("Importing AI service...");
      const { getAIResponse } = await import('../services/aiService');
      console.log("AI service imported successfully");

      console.log("Calling getAIResponse...");
      const aiResponseText = await getAIResponse(
        userMessage.content,
        "You are Nexus AI, a helpful and knowledgeable assistant. Provide accurate, informative responses based on real-world data and knowledge."
      );

      console.log("AI Response received:", aiResponseText);

      const aiMessage = {
        role: "assistant",
        content: aiResponseText,
      };

      setMessages((prev) => [...prev, aiMessage]);
      console.log("=== AI Request Completed Successfully ===");
    } catch (error) {
      console.error("=== AI Request Failed ===");
      console.error("Error details:", error);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);

      const errorMessage = {
        role: "assistant",
        content: `⚠️ ${error.message || "I'm having trouble connecting right now. Please try again in a moment."}`,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttachment = (file) => {
    // For now, we'll just simulate an attachment by adding a system message or notification
    // In a real app, this would upload the file or convert to base64
    const attachmentMessage = {
      role: "user",
      content: `[Attached file: ${file.name}]`
    };

    // Auto-send the attachment notification for now, or just populate input
    // Let's populate input to be safe
    setInputValue(prev => prev ? `${prev}\n[Attached: ${file.name}]` : `[Attached: ${file.name}] `);
  };

  const isLanding = messages.length === 0;

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent relative overflow-hidden">
      <Header />

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto no-scrollbar pb-56"
        style={{ scrollBehavior: 'smooth' }}
      >
        {isLanding ? (
          <div className="flex flex-col items-center justify-center min-h-[75vh] sm:min-h-[80vh] px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-10 tracking-tight text-center drop-shadow-2xl">
              What can I help with?
            </h1>

            <ChatInput
              value={inputValue}
              setValue={setInputValue}
              onSend={(options) => handleSend(null, options)}
              isLoading={isLoading}
              onAttachment={handleAttachment}
            />

            <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8 justify-center max-w-2xl px-4">
              {[
                { label: "Create image", icon: ImageIcon },
                { label: "Summarize text", icon: BookOpen },
                { label: "Brainstorm", icon: Sparkles },
                { label: "Analyze data", icon: Search },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleSend(item.label)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm border border-white/10 rounded-full text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all shadow-sm backdrop-blur-sm touch-manipulation"
                >
                  <item.icon size={14} className="text-indigo-400 sm:w-4 sm:h-4" />
                  <span className="whitespace-nowrap">{item.label}</span>
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
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0B0F19] via-[#0B0F19] to-transparent pt-16 pb-4">
          <ChatInput
            value={inputValue}
            setValue={setInputValue}
            onSend={(options) => handleSend(null, options)}
            isLoading={isLoading}
            onAttachment={handleAttachment}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
