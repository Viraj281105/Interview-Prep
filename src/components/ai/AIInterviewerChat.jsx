import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AIInterviewerChat = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hi! I'm your AI Interview Coach. Would you like to practice a behavioral question or a technical concept today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = { 
        role: 'ai', 
        content: "That's a good start! Could you elaborate more using the STAR method? Specifically, what was the exact Action you took to resolve the issue?" 
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Card className="h-full flex flex-col p-0 overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center shadow-sm">
          <Bot size={20} />
        </div>
        <div>
          <h3 className="font-bold">Interview Coach</h3>
          <p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'ai' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-sm' 
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-sm text-slate-800 dark:text-slate-200'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-sm shadow-sm flex gap-1 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="Type your response..." 
            className="flex-1 bg-white dark:bg-slate-950" 
          />
          <Button type="submit" disabled={!input.trim() || isTyping} className="shadow-blue-500/20 shadow-lg px-6">
            <Send size={18} />
          </Button>
        </form>
      </div>
    </Card>
  );
};
