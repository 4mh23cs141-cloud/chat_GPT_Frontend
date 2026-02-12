import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Loader2 } from 'lucide-react';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize: Create or get first session
  useEffect(() => {
    const initSession = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Get existing sessions
        const sessionsRes = await fetch(`http://127.0.0.1:8000/sessions?token=${token}`);
        if (sessionsRes.ok) {
          const sessions = await sessionsRes.json();

          if (sessions.length > 0) {
            // Use most recent session
            setCurrentSessionId(sessions[0].id);
            await loadSessionMessages(sessions[0].id, token);
          } else {
            // Create first session
            const createRes = await fetch(`http://127.0.0.1:8000/sessions?token=${token}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title: "New Chat" })
            });

            if (createRes.ok) {
              const newSession = await createRes.json();
              setCurrentSessionId(newSession.id);
            }
          }
        } else if (sessionsRes.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (err) {
        console.error("Session init failed:", err);
      } finally {
        setInitialLoading(false);
      }
    };

    initSession();
  }, [navigate]);

  const loadSessionMessages = async (sessionId, token) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/sessions/${sessionId}/messages?token=${token}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.map(m => ({ role: m.role, content: m.content })));
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading || !currentSessionId) return;

    const token = localStorage.getItem('token');
    const userMsg = input;

    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/ask?token=${token}&session_id=${currentSessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, system_prompt: "You are Nexus AI." })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
      } else {
        throw new Error("Neural connection failure");
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection lost. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#0B0F19] to-[#131B2C]">
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Welcome to Nexus AI</h1>
            <p className="text-gray-400">Start a conversation to unlock the power of AI</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-4 rounded-2xl ${msg.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'glass text-gray-100'
                }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t border-white/10">
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Query Nexus AI..."
            className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="p-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-2xl transition-colors"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;