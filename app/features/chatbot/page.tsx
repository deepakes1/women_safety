'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend, FiAlertTriangle, FiShield, FiUser } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from the server');
      }

      const data = await response.json();
      
      const botResponse: Message = {
        id: messages.length + 2,
        text: data.answer || "I&apos;m sorry, I couldn&apos;t process your request. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorResponse: Message = {
        id: messages.length + 2,
        text: "I&apos;m sorry, there was an error processing your request. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmergency = () => {
    // Implement emergency functionality
    alert('Emergency services have been notified. Help is on the way!');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-100 p-2 rounded-full">
              <FiShield className="text-indigo-600 text-xl" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Safety Assistant</h1>
          </div>
          <button
            onClick={handleEmergency}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors text-white text-sm font-medium"
          >
            <FiAlertTriangle className="text-lg" />
            <span>Emergency</span>
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-4xl mx-auto w-full">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div className="flex items-start space-x-2 max-w-[80%]">
                {message.sender === 'bot' && (
                  <div className="bg-indigo-100 p-2 rounded-full mt-1">
                    <FiShield className="text-indigo-600" />
                  </div>
                )}
                <div
                  className={`rounded-2xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {message.sender === 'user' && (
                  <div className="bg-indigo-100 p-2 rounded-full mt-1">
                    <FiUser className="text-indigo-600" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start mb-4"
            >
              <div className="flex items-start space-x-2">
                <div className="bg-indigo-100 p-2 rounded-full mt-1">
                  <FiShield className="text-indigo-600" />
                </div>
                <div className="bg-white text-gray-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-4 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className={`p-2 rounded-full transition-colors ${
                isLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <FiSend className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
