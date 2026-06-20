import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Send, Bot, User, Sparkles } from 'lucide-react';
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
    <Card glass className="h-full flex flex-col p-0 overflow-hidden border-brand-indigo/10 dark:border-brand-indigo/20 shadow-xl relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-indigo/5 dark:bg-brand-indigo/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
      
      <div className="p-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 shrink-0 z-10">
        <div className="w-12 h-12 rounded-2xl bg-brand-indigo/10 text-brand-indigo flex items-center justify-center shadow-inner relative">
          <Sparkles size={20} className="absolute -top-1 -right-1 text-amber-400" />
          <Bot size={24} />
        </div>
        <div>
          <h3 className="font-heading font-bold tracking-tight text-slate-900 dark:text-slate-100">Interview Coach</h3>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> Online
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar space-y-6 relative z-10">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'ai' ? 'bg-brand-indigo/10 text-brand-indigo' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                {msg.role === 'ai' ? <Sparkles size={14} /> : <User size={14} />}
              </div>
              <div className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-brand-indigo text-white rounded-tr-sm shadow-brand-indigo/20' 
                  : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-tl-sm text-slate-800 dark:text-slate-200'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-brand-indigo/10 text-brand-indigo flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles size={14} />
              </div>
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-tl-sm shadow-sm flex gap-1.5 items-center">
                <motion.div className="w-1.5 h-1.5 bg-brand-indigo rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                <motion.div className="w-1.5 h-1.5 bg-brand-indigo rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                <motion.div className="w-1.5 h-1.5 bg-brand-indigo rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      <div className="p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-10 shrink-0">
        <form onSubmit={handleSend} className="flex gap-3 max-w-4xl mx-auto">
          <Input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="Type your response..." 
            className="flex-1 bg-white/80 dark:bg-slate-950/80 border-slate-300 dark:border-slate-700 rounded-xl focus-visible:ring-brand-indigo/50 h-12" 
          />
          <Button type="submit" disabled={!input.trim() || isTyping} className="h-12 w-12 p-0 rounded-xl shadow-brand-indigo/20 shadow-lg shrink-0 bg-brand-indigo hover:bg-brand-purple">
            <Send size={18} className="ml-0.5" />
          </Button>
        </form>
      </div>
    </Card>
  );
};
