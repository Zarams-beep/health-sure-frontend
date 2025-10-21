"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type MarkdownProps = {
  content: string;
  isUser?: boolean;
};

const Markdown: React.FC<MarkdownProps> = ({ content, isUser }) => {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={content}
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`chat-container ${
          isUser
            ? "chat-container-user"
            : "chat-container-not-user"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({
              inline,
              className,
              children,
              ...props
            }: {
              inline?: boolean;
              className?: string;
              children?: React.ReactNode;
            }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  style={vscDarkPlus as any}
                  PreTag="div"
                  customStyle={{
                    background: "transparent",
                    fontSize: "0.9rem",
                    padding: "0.5rem",
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className="chat-code-container"
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </motion.div>
    </AnimatePresence>
  );
};

export default Markdown;