"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePageSecondSection() {
  return (
    <div className="features-container">
      <header>
        <h2>Thousand Steps Brought Closer</h2>
        <p>
          We simplify access to quality healthcare, ensuring that every step toward wellness is secure, transparent, and hassle-free.
        </p>
      </header>
      <div className="features-section">
        {[
          {
            src: "/hero-img-2.jpg",
            alt: "Health Management",
            title: "Health Tracking",
            description: "Monitor your health savings with real-time updates.",
          },
          {
            src: "/img-3.jpg",
            alt: "Family Coverage",
            title: "Family Coverage",
            description: "Cover all your loved ones with a single plan.",
          },
          {
            src: "/img-4.jpg",
            alt: "Global Access",
            title: "Global Access",
            description: "Access your health savings from anywhere in the world.",
          },
          {
            src: "/img-5.jpg",
            alt: "Mental Health",
            title: "Mental Health Support",
            description: "Keep track of both your physical and mental well-being.",
          },
        ].map((feature, index) => (
          <motion.section
            key={index}
            className="features-part"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Image */}
            <div className="image-container">
              <Image
                src={feature.src}
                alt={feature.alt}
                width={1000}
                height={1000}
                quality={100}
              />
            </div>

            {/* Hoverable Content */}
            <motion.div
              className="text-overlay-container"
              initial="visible"
              whileHover="hidden"
              variants={{
                visible: { opacity: 1 },
                hidden: { opacity: 0 },
              }}
            >
              <h2 className="feature-title">{feature.title}</h2>
            </motion.div>

            <motion.div
              className="text-overlay-container description"
              initial="hidden"
              whileHover="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
