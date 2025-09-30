"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const faqData = [
  {
    question: "How does Health Sure work?",
    answer:
      "Health Sure provides a secure platform for tracking health savings, proof of deposits, and withdrawals while ensuring financial transparency.",
  },
  {
    question: "Is my money safe?",
    answer:
      "Yes! Your funds are securely stored and can only be accessed under specific conditions to ensure responsible usage.",
  },
  {
    question: "How can I sign up?",
    answer:
      "Click the 'Get Started' button, fill in your details, and start securing your health funds in minutes.",
  },
  {
    question: "Can I withdraw my savings anytime?",
    answer:
      "No, withdrawals are only allowed when you are admitted to a hospital or when the hospital contacts us to request funds on your behalf. This ensures responsible spending and availability of funds for medical emergencies. If the account holder passes away, the next of kin will be granted access to the funds.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
      <motion.div
        className="faq-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              {/* Question Row */}
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span className="">{item.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className=""
                >
                  {openIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </motion.span>
              </button>

              {/* Animated Answer */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.p
                    key="content"
                    className="faq-answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {item.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div></div>
    </section>
  );
}
