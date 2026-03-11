"use client";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { IoSend } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function MessagesPage() {
  const { token, userId, ready } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading || !ready) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: text, sessionId: userId }), // sessionId keeps chat history per user
      });

      const data = await response.json();
      if (!response.ok) {
        // Show the backend's error message (e.g. "Ollama unavailable")
        const errMsg = data.error || "Sorry, I couldn't get a response.";
        setMessages((prev) => [...prev, { role: "assistant", content: errMsg }]);
      } else {
        const reply = data.answer || "Sorry, I couldn't get a response.";
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error — could not reach the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-page-container">
      {/* Header */}
      <div style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "12px", marginBottom: "12px" }}>
        <h2 style={{ color: "var(--color-primary-dark)", fontWeight: 700, fontSize: "20px" }}>
          AI Health Assistant
        </h2>
        <p style={{ color: "var(--color-text-muted)", fontSize: "13px" }}>
          Ask me anything about your health. Powered by AI.
        </p>
      </div>

      {/* Messages area */}
      <div className="sub-chat-page-container">
        {messages.length === 0 && (
          <div style={{ textAlign: "center", color: "var(--color-text-muted)", marginTop: "60px" }}>
            <RiRobot2Line style={{ fontSize: "48px", color: "var(--color-primary)", marginBottom: "12px" }} />
            <p style={{ fontSize: "16px" }}>Hi! How can I help you today?</p>
            <p style={{ fontSize: "13px", marginTop: "6px" }}>
              Ask about your medications, symptoms, appointments, or general health tips.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              alignItems: "flex-end",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            {msg.role === "assistant" && (
              <RiRobot2Line style={{ fontSize: "22px", color: "var(--color-primary)", flexShrink: 0 }} />
            )}
            <div className={`chat-container chat-container-${msg.role === "user" ? "user" : "not-user"}`}>
              {msg.content}
            </div>
            {msg.role === "user" && (
              <FaUserCircle style={{ fontSize: "22px", color: "var(--color-primary-dark)", flexShrink: 0 }} />
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
            <RiRobot2Line style={{ fontSize: "22px", color: "var(--color-primary)" }} />
            <div className="chat-container chat-container-not-user thinking-container">
              Thinking...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Ask a health question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading || !ready}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim() || !ready}>
          <IoSend size={18} />
        </button>
      </div>
    </div>
  );
}
