"use client";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const faqData = [
  {
    question: "How does Health Sure work?",
    answer: "Health Sure provides a secure platform for tracking health savings, proof of deposits, and withdrawals while ensuring financial transparency."
  },
  {
    question: "Is my money safe?",
    answer: "Yes! Your funds are securely stored and can only be accessed under specific conditions to ensure responsible usage."
  },
  {
    question: "How can I sign up?",
    answer: "Click the 'Get Started' button, fill in your details, and start securing your health funds in minutes."
  },
  {
    question: "Can I withdraw my savings anytime?",
    answer: "No, withdrawals are only allowed when you are admitted to a hospital or when the hospital contacts us to request funds on your behalf. This ensures responsible spending and availability of funds for medical emergencies. If the account holder passes away, the next of kin will be granted access to the funds." 
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{item.question}</h3>
                {openIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
              {openIndex === index && <p className="faq-answer">{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
