import React, { useState, useEffect } from 'react';
import { X, Send, ArrowUpRight, Settings, Check } from 'lucide-react';
import { askCampusAIAgent, getStoredApiKeys, saveApiKeys } from '../services/aiAgent';

export default function AIConciergeModal({ 
  currentUser, 
  events, 
  onClose, 
  onRequestJoinEvent,
  onAddScheduledAlert 
}) {
  const [messages, setMessages] = useState([
    {
      id: "m-01",
      sender: "ai",
      text: `Hi ${currentUser.name}. I'm your Campus Concierge. I can suggest gatherings based on your interests (${currentUser.interests ? currentUser.interests.slice(0, 3).join(', ') : 'technology'}), answer schedule questions, or set up notification alerts. What would you like to know?`,
      timestamp: "Just now",
      recommendations: []
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // API Key Settings State
  const [showSettings, setShowSettings] = useState(false);
  const [geminiKeyInput, setGeminiKeyInput] = useState('');
  const [openRouterKeyInput, setOpenRouterKeyInput] = useState('');
  const [saveConfirmation, setSaveConfirmation] = useState(false);

  useEffect(() => {
    const keys = getStoredApiKeys();
    setGeminiKeyInput(keys.geminiKey);
    setOpenRouterKeyInput(keys.openRouterKey);
  }, []);

  const handleSaveKeys = (e) => {
    e.preventDefault();
    saveApiKeys({
      geminiKey: geminiKeyInput,
      openRouterKey: openRouterKeyInput
    });
    setSaveConfirmation(true);
    setTimeout(() => {
      setSaveConfirmation(false);
      setShowSettings(false);
    }, 900);
  };

  const quickPrompts = [
    "Events matching my background",
    "Remind me when new hackathons open",
    "Events open to all colleges"
  ];

  const handleSendQuery = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMsg = {
      id: `m-u-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: "Just now"
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await askCampusAIAgent({
        query,
        currentUser,
        events,
        geminiKey: geminiKeyInput,
        openRouterKey: openRouterKeyInput
      });

      // Register alert if query indicates scheduling
      const qLower = query.toLowerCase();
      if (qLower.includes("remind") || qLower.includes("alert") || qLower.includes("notify") || qLower.includes("schedule")) {
        onAddScheduledAlert({
          id: `alt-${Date.now()}`,
          query: query,
          frequency: "Real-time alert",
          status: "Active"
        });
      }

      const aiMsg = {
        id: `m-a-${Date.now()}`,
        sender: "ai",
        text: response.text,
        timestamp: "Just now",
        recommendations: response.matchedEvents || []
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg = {
        id: `m-err-${Date.now()}`,
        sender: "ai",
        text: "I couldn't process that query right now. Please try again.",
        timestamp: "Just now"
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#141418] border border-white/10 rounded-2xl shadow-2xl flex flex-col h-[600px] max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white tracking-tight">
              Campus Concierge
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Personalized event suggestions, schedule reminders, and campus guidelines.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all"
              title="API Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* API Settings Drawer */}
        {showSettings && (
          <div className="p-4 bg-[#19191e] border-b border-white/10 animate-in fade-in slide-in-from-top-2 duration-150 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">API Configuration</span>
              <span className="text-[11px] text-neutral-400">Optional · Saved to browser session</span>
            </div>

            <form onSubmit={handleSaveKeys} className="space-y-2.5">
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">
                  Google AI Studio (Gemini API Key)
                </label>
                <input
                  type="password"
                  placeholder="Paste Gemini API key..."
                  value={geminiKeyInput}
                  onChange={(e) => setGeminiKeyInput(e.target.value)}
                  className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">
                  OpenRouter API Key (Automatic Failover)
                </label>
                <input
                  type="password"
                  placeholder="Paste OpenRouter API key (sk-or-...)..."
                  value={openRouterKeyInput}
                  onChange={(e) => setOpenRouterKeyInput(e.target.value)}
                  className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-neutral-500">
                  {saveConfirmation ? "Settings saved successfully!" : "Uses local engine when keys are absent."}
                </span>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-white hover:bg-neutral-200 text-black text-xs font-semibold rounded-lg transition-all"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-white text-black font-medium'
                    : 'bg-white/[0.05] border border-white/[0.08] text-neutral-200'
                }`}
              >
                {msg.text}

                {/* Event Recommendations */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="mt-3 space-y-2 pt-2 border-t border-white/[0.08]">
                    {msg.recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="min-w-0">
                          <span className="font-semibold text-white block truncate">{rec.title}</span>
                          <span className="text-[11px] text-neutral-400 block">{rec.date} · {rec.venue}</span>
                        </div>
                        <button
                          onClick={() => {
                            onRequestJoinEvent(rec);
                            onClose();
                          }}
                          className="px-2.5 py-1 bg-white hover:bg-neutral-200 text-black font-semibold rounded text-[11px] flex-shrink-0"
                        >
                          Join
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start">
              <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl px-4 py-2.5 text-xs text-neutral-400 animate-pulse">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 border-t border-white/[0.06] flex items-center gap-2 overflow-x-auto scrollbar-none">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(prompt)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white transition-all whitespace-nowrap border border-white/[0.05]"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuery();
          }}
          className="p-3 sm:p-4 border-t border-white/[0.08] flex items-center gap-2 bg-[#121215]"
        >
          <input
            type="text"
            placeholder="Ask about events or type 'Remind me when hackathons open'..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-black/40 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="p-2.5 bg-white hover:bg-neutral-200 disabled:opacity-40 text-black rounded-xl transition-all font-semibold"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
