"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaWallet, FaPeopleRoof } from "react-icons/fa6";
import { IoAirplane } from "react-icons/io5";
import { RiMentalHealthFill } from "react-icons/ri";

export default function HomePageHeroSection() {
  return (
    <section className="hero-section">
        <div className="container">
      {/* Hero Text + Image */}
      <div className="hero-section-1">
        {/* Animated Text Block */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Your Health, Your Security
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Experience a smarter way to manage your health funds with{" "}
            <strong>Health Sure</strong>—where transparency meets trust.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Track your deposits, withdrawals, and balances effortlessly,
            ensuring peace of mind with every transaction.
          </motion.p>

          <motion.button
            className="cta-button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Animated Image */}
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Image
            src="/hero-img-2.jpg"
            alt="Health Sure illustration"
            width={1000}
            height={1000}
            quality={100}
            priority
          />
        </motion.div>
      </div>

      {/* Animated Feature Cards */}
      <div className="hero-card-container">
        <motion.div
          className="hero-card"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          whileHover={{ y: -10 }}
        >
          <FaWallet className="hero-card-icon" />
          <h3>Smart Health Wallet</h3>
          <p>
            Take full control of your health funds. Track your deposits,
            withdrawals, and balances with real-time transparency.
          </p>
        </motion.div>

        <motion.div
          className="hero-card"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
          whileHover={{ y: -10 }}
        >
          <FaPeopleRoof className="hero-card-icon" />
          <h3>Family-Centric Coverage</h3>
          <p>
            Your loved ones deserve the best. Enjoy seamless health management
            for you and your family, all in one place.
          </p>
        </motion.div>

        <motion.div
          className="hero-card"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
          whileHover={{ y: -10 }}
        >
          <IoAirplane className="hero-card-icon" />
          <h3>Global Health Access</h3>
          <p>
            Stay covered wherever life takes you. Access your health funds
            anytime, anywhere—no borders, no limits.
          </p>
        </motion.div>

        <motion.div
          className="hero-card"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
          whileHover={{ y: -10 }}
        >
          <RiMentalHealthFill className="hero-card-icon" />
          <h3>Holistic Well-being</h3>
          <p>
            Health goes beyond the physical. Keep track of both medical and
            mental wellness support, all in one secure platform.
          </p>
        </motion.div>
      </div></div>
    </section>
  );
}
