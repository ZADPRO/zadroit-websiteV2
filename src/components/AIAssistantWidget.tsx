import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, X, Send, ArrowRight, Zap } from 'lucide-react';
import { productsData } from '../data/websiteData';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    action: () => void;
  }[];
}

export const AIAssistantWidget: React.FC = () => {
  const { openModal, navigate } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Hello! I am Zadroit AI Assistant. How can I help you engineer or scale your digital systems today?',
      timestamp: 'Just now',
      actions: [
        {
          label: 'Request a Quote',
          action: () => openModal({ type: 'quote-modal' })
        },
        {
          label: 'Explore Products',
          action: () => navigate('products')
        },
        {
          label: 'View Job Openings',
          action: () => navigate('careers')
        }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: userText,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Generate intelligent AI response based on keywords
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let aiResponse = '';
      let actions: ChatMessage['actions'] = [];

      if (lower.includes('erp') || lower.includes('zaderp') || lower.includes('inventory')) {
        aiResponse =
          'ZadERP is our flagship enterprise resource planning suite with multi-warehouse inventory, automated e-invoicing, HRMS, and real-time analytics.';
        actions = [
          { label: 'Book ZadERP Demo', action: () => openModal({ type: 'product-demo', product: productsData.find(p => p.id === 'zaderp') }) },
          { label: 'Explore Features', action: () => navigate('products') }
        ];
      } else if (lower.includes('medpredit') || lower.includes('health') || lower.includes('hospital') || lower.includes('ai')) {
        aiResponse =
          'Medpredit is our AI-powered clinical triage and predictive diagnostic engine with 96.4% diagnostic accuracy and HL7/FHIR hospital interoperability.';
        actions = [
          { label: 'Schedule AI Demo', action: () => openModal({ type: 'product-demo', product: productsData.find(p => p.id === 'medpredit') }) },
          { label: 'Read AI Whitepaper', action: () => navigate('blog') }
        ];
      } else if (lower.includes('sports') || lower.includes('turf') || lower.includes('booking') || lower.includes('zadsports')) {
        aiResponse =
          'ZadSports is an intelligent venue booking platform featuring automated IoT floodlight relay control, live scoreboards, and tournament fixture management.';
        actions = [
          { label: 'Check ZadSports', action: () => navigate('products') }
        ];
      } else if (lower.includes('career') || lower.includes('job') || lower.includes('hiring') || lower.includes('salary') || lower.includes('apply')) {
        aiResponse =
          "We are actively hiring Senior Full-Stack Engineers, AI/ML Leads, UI/UX Designers, and Cloud Architects across Salem, Bangalore, and Remote!";
        actions = [
          { label: "View Open Positions", action: () => navigate('careers') }
        ];
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('quote') || lower.includes('estimate') || lower.includes('rate')) {
        aiResponse =
          'We offer transparent milestone-based pricing, dedicated team staffing, and agile retainers. Let us provide you with an itemized proposal.';
        actions = [
          { label: 'Calculate Quote', action: () => openModal({ type: 'quote-modal' }) }
        ];
      } else if (lower.includes('service') || lower.includes('cloud') || lower.includes('devops') || lower.includes('mobile') || lower.includes('security')) {
        aiResponse =
          'We offer Enterprise Software Engineering, Cloud Architecture & DevOps, Custom AI/ML, Full-Stack Web & Mobile Apps, UI/UX Design, and Cybersecurity VAPT.';
        actions = [
          { label: 'Browse Services', action: () => navigate('services') },
          { label: 'Request Quote', action: () => openModal({ type: 'quote-modal' }) }
        ];
      } else {
        aiResponse =
          'Thank you for reaching out! Zadroit engineers enterprise software, AI, and cloud architectures. Would you like to schedule a free 30-minute strategy call or request a quote?';
        actions = [
          { label: 'Get a Quote', action: () => openModal({ type: 'quote-modal' }) },
          { label: 'Contact Us', action: () => navigate('contact') }
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'ai',
          text: aiResponse,
          timestamp: 'Just now',
          actions
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Trigger floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 border border-blue-400/40"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-blue-600 animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-wide font-heading hidden sm:inline">
            Zadroit AI Assistant
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold hidden md:inline">
            Online
          </span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="relative w-[340px] sm:w-[380px] bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl overflow-hidden animate-modal-in flex flex-col h-[480px]">
          {/* Top Bar */}
          <div className="p-4 bg-gradient-to-r from-blue-900/80 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/50 flex items-center justify-center">
                <Bot className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-heading flex items-center gap-1.5">
                  Zadroit AI Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <p className="text-[10px] text-slate-400">Enterprise Solutions & Architecture Guide</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/20'
                      : 'bg-slate-950/90 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* AI Quick Actions */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {msg.actions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          act.action();
                          setIsOpen(false);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-blue-600/15 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-[11px] font-medium transition-colors flex items-center gap-1"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}
                <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions chips */}
          <div className="px-3 py-1.5 bg-slate-950 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[10px]">
            <span className="text-slate-400 shrink-0 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              Quick:
            </span>
            {['ZadERP Demo', 'AI Triage', 'Get Quote', 'Careers'].map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  setInputMessage(chip);
                }}
                className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 whitespace-nowrap"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about Zadroit services, ERP, AI..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
