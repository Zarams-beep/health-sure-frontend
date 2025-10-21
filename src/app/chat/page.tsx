"use client";

import React, { useState } from "react";
import Markdown from "@/component/Markdown";
import { FiSend } from "react-icons/fi";

export default function ChatPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!question.trim()) return;
    setLoading(true);

    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    const userInput = question;
    setQuestion("");

    try {
      const res = await fetch("https://health-sure-backend.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userInput }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: "ai", text: data.answer }]);
      } else {
        setMessages((prev) => [...prev, { role: "ai", text: "⚠️ Error: No response" }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "ai", text: "Server error ⚠️" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-page-container">
      <div className="sub-chat-page-container">
        {messages.map((msg, i) => (
          <Markdown key={i} content={msg.text} isUser={msg.role === "user"} />
        ))}
        {loading && (
          <div className="thinking-container">Thinking...</div>
        )}
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Ask something..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className=""
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className=""
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
}
