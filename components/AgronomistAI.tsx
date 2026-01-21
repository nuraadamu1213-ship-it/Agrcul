
import React, { useState, useRef, useEffect } from 'react';
import { askAgronomist } from '../services/gemini';
import { Message } from '../types';

const AgronomistAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am your AI Agronomist. How can I help you today? You can ask about irrigation, pest control, or crop rotation.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const response = await askAgronomist(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: response || "I'm sorry, I couldn't process that request." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'An error occurred. Please check your API key and try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-green-600 p-4 text-white">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span>👨‍🌾</span> AI Agronomist Advisor
        </h3>
        <p className="text-xs text-green-100">Expert farming advice at your fingertips</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
              m.role === 'user' 
                ? 'bg-green-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
            }`}>
              <p className="text-sm whitespace-pre-wrap">{m.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-500 rounded-2xl rounded-tl-none border border-gray-100 p-4 shadow-sm animate-pulse">
              <p className="text-sm">Thinking...</p>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question here..."
            className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 disabled:bg-gray-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgronomistAI;
