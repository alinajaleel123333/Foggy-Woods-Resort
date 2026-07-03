"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Sparkles, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Welcome to Foggy Woods. I'm Misty, your AI concierge. How can I assist you with your retreat today? Feel free to ask about our accommodations, amenities, dining, spa, check-in details, or pet policies.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Handle keyboard events (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");
    setErrorMsg("");

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      });

      if (!response.ok) {
        throw new Error("Failed to receive response from assistant");
      }

      const data = await response.json();

      const botMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        sender: "bot",
        text: data.reply,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error("Chat error:", error);
      setErrorMsg("Unable to connect to Misty. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* ── Toggle Floating Button ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={isOpen ? "Close AI Concierge" : "Open AI Concierge"}
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg border border-[#5d3e2e]/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
          isOpen
            ? "bg-[#5d3e2e] text-white hover:bg-[#4a3124]"
            : "bg-[#1a2416] text-[#f9f8f6] hover:bg-[#253320]"
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 transition-transform duration-300" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          </div>
        )}
      </button>

      {/* ── Chat Window Dialog ── */}
      <div
        ref={chatWindowRef}
        role="dialog"
        aria-modal="true"
        aria-label="AI Concierge Chatbox"
        className={`absolute bottom-20 right-0 w-[350px] sm:w-[380px] h-[520px] max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-2xl border border-zinc-200/80 overflow-hidden flex flex-col transition-all duration-300 transform origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-[#1a2416] p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-[#5d3e2e] h-9 w-9 rounded-full flex items-center justify-center text-white border border-amber-500/20">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <h2
                className="text-lg text-white leading-tight font-medium"
                style={{ fontFamily: "'Boska', serif" }}
              >
                Misty
              </h2>
              <p className="text-[10px] text-white/60 uppercase tracking-widest">
                AI Concierge
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close Chat"
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message Panel */}
        <div className="flex-1 bg-[#f9f8f6] p-4 overflow-y-auto space-y-4 flex flex-col">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[82%] ${
                msg.sender === "user" ? "self-end items-end" : "self-start items-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl text-[14px] leading-[1.6] shadow-sm ${
                  msg.sender === "user"
                    ? "bg-[#5d3e2e] text-[#f9f8f6] rounded-br-none"
                    : "bg-white text-zinc-800 rounded-bl-none border border-zinc-200/60"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
              <span className="text-[9px] text-zinc-400 mt-1 px-1">
                {formatTime(msg.timestamp)}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex flex-col max-w-[82%] self-start items-start">
              <div className="px-4 py-3 rounded-2xl bg-white border border-zinc-200/60 rounded-bl-none shadow-sm flex items-center gap-1.5 h-[40px]">
                <div className="h-2 w-2 bg-[#5d3e2e]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-[#5d3e2e]/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="h-2 w-2 bg-[#5d3e2e]/80 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}

          {/* Connection Error Message */}
          {errorMsg && (
            <div className="flex gap-2 items-center bg-red-50 text-red-700 p-3 rounded-xl border border-red-100 text-xs self-center w-full">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar Form */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 bg-white border-t border-zinc-100 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about rooms, policies, spa..."
            aria-label="Message to AI Concierge"
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-full bg-zinc-50 border border-zinc-200 text-[14px] text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#5d3e2e] focus:border-[#5d3e2e] disabled:opacity-60 transition-all font-sans"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send Message"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5d3e2e] text-[#f9f8f6] hover:bg-[#4a3124] active:scale-95 disabled:bg-zinc-100 disabled:text-zinc-300 transition-all cursor-pointer shrink-0"
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
