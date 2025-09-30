"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePageSecondSection() {
  return (
    <motion.div
      className="features-container"
      /* Fade + slide up when the section enters the viewport */
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="container">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2>Thousand Steps Brought Closer</h2>
        <p>
          We simplify access to quality healthcare, ensuring that every step toward
          wellness is secure, transparent, and hassle-free.
        </p>
      </motion.header>

      {/* Feature Cards */}
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
            /* Staggered entrance */
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2 + index * 0.2,
              duration: 0.6,
              ease: "easeOut",
            }}
            viewport={{ once: false, amount: 0.3 }}
            /* Scale a bit on hover */
            whileHover={{ scale: 1.05 }}
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

            {/* Title fades out on hover */}
            <motion.div
              className="text-overlay-container"
              initial={{ opacity: 1 }}
              whileHover={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="feature-title">{feature.title}</h2>
            </motion.div>

            {/* Description fades in on hover */}
            <motion.div
              className="text-overlay-container description"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          </motion.section>
        ))}
      </div></div>
    </motion.div>
  );
}
