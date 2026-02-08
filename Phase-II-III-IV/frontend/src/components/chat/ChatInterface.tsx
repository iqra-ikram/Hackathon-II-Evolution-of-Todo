"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { chatApi } from "@/lib/chat-api";
import { Message, MessageRole } from "@/types/chat";
import { Send, Bot, User as UserIcon, Loader2 } from "lucide-react";

export default function ChatInterface() {
    const { data: session, isPending: isAuthPending } = useAuth();
    const userId = session?.user?.id;

    // Debug logging
    useEffect(() => {
        console.log("ChatInterface Session:", session);
        console.log("ChatInterface UserId:", userId);
    }, [session, userId]);

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<number | undefined>(undefined);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submit triggered. Input:", input, "UserId:", userId);

        if (!input.trim() || !userId) {
            console.warn("Submit aborted: Missing input or userId");
            return;
        }

        const userMsg: Message = {
            id: Date.now(), // temp id
            role: MessageRole.USER,
            content: input,
            created_at: new Date().toISOString(),
            conversation_id: conversationId || 0
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await chatApi.sendMessage(userId, userMsg.content, conversationId);

            setConversationId(response.conversation_id);

            const assistantMsg: Message = {
                id: Date.now() + 1,
                role: MessageRole.ASSISTANT,
                content: response.response,
                created_at: new Date().toISOString(),
                conversation_id: response.conversation_id
            };

            setMessages(prev => [...prev, assistantMsg]);
        } catch (error) {
            console.error("Chat error:", error);
            // Add error message to UI?
        } finally {
            setIsLoading(false);
        }
    };

    if (isAuthPending) {
        return (
            <div className="flex items-center justify-center h-[600px] bg-[#111111] rounded-[32px]">
                <Loader2 className="w-6 h-6 text-[#A3E635] animate-spin" />
            </div>
        );
    }

    if (!userId) {
        return (
            <div className="flex items-center justify-center h-[600px] bg-[#111111] rounded-[32px] text-neutral-400">
                Please log in to use the chat.
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#111111] overflow-hidden relative">
            {/* Header */}
            <div className="p-6 border-b border-[#1a1a1a] flex items-center justify-between bg-[#111111]/90 backdrop-blur-md absolute top-0 w-full z-10">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-2xl bg-[#1a1a1a] flex items-center justify-center border border-[#333] overflow-hidden">
                            <img src="/bot-icon.svg" alt="AI" className="w-8 h-8 object-contain" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#A3E635] border-2 border-[#111111]"></div>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm tracking-tight">AI Assistant</h3>
                        <p className="text-[11px] text-[#A3E635] font-medium uppercase tracking-wider">Online</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-2 py-1 rounded-md bg-[#1a1a1a] border border-[#333] text-[10px] text-neutral-500 font-mono">
                        GPT-4o
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 pt-24 space-y-6 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                        <div className="w-20 h-20 rounded-[32px] bg-[#1a1a1a] flex items-center justify-center border border-[#333] mb-2 shadow-2xl">
                            <img src="/bot-icon.svg" alt="Bot" className="w-14 h-14 object-contain opacity-50" />
                        </div>
                        <div>
                            <p className="text-white font-medium">How can I help you today?</p>
                            <p className="text-sm text-neutral-500 mt-1">Ask me to create tasks, organize your day, or just chat.</p>
                        </div>
                    </div>
                )}

                {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-4 ${msg.role === MessageRole.USER ? 'flex-row-reverse' : 'flex-row'}`}>

                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === MessageRole.USER
                            ? 'bg-[#A3E635] text-black'
                            : 'bg-[#1a1a1a] border border-[#333]'
                            }`}>
                            {msg.role === MessageRole.USER ? (
                                <UserIcon size={16} />
                            ) : (
                                <img src="/bot-icon.svg" alt="Bot" className="w-6 h-6 object-contain" />
                            )}
                        </div>

                        {/* Bubble */}
                        <div className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === MessageRole.USER
                            ? 'bg-[#A3E635] text-black rounded-tr-none font-medium'
                            : 'bg-[#1a1a1a] text-neutral-200 rounded-tl-none border border-[#333]'
                            }`}>
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-4 flex-row">
                        <div className="w-8 h-8 rounded-xl bg-[#1a1a1a] border border-[#333] flex items-center justify-center flex-shrink-0 mt-1">
                            <img src="/bot-icon.svg" alt="Bot" className="w-6 h-6 object-contain animate-pulse" />
                        </div>
                        <div className="bg-[#1a1a1a] border border-[#333] p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-[#A3E635] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1 h-1 bg-[#A3E635] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1 h-1 bg-[#A3E635] rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#111111] border-t border-[#1a1a1a]">
                <form onSubmit={handleSubmit} className="flex gap-3 relative">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message..."
                        disabled={isLoading}
                        className="flex-1 p-4 bg-[#080808] text-white placeholder-neutral-600 rounded-2xl border border-[#1a1a1a] focus:outline-none focus:border-[#333] focus:ring-1 focus:ring-[#333] transition-all"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-[#A3E635] text-black rounded-xl hover:bg-[#b5f04e] disabled:opacity-50 disabled:hover:bg-[#A3E635] transition-all shadow-lg hover:shadow-[#A3E635]/20"
                    >
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                    </button>
                </form>
            </div>
        </div>
    );
}
