"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaWallet, FaPeopleRoof } from "react-icons/fa6";
import { IoAirplane } from "react-icons/io5";
import { RiMentalHealthFill } from "react-icons/ri";

const cardVariantsLeft = {
    hidden: { x: "-100vw", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, delay: 0.2 } }
};

const cardVariantsRight = {
    hidden: { x: "100vw", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, delay: 0.4 } }
};

export default function HomePageHeroSection() {
    return (
        <section className="hero-section">
            <div className="hero-section-1">
                <div className="hero-content">
                    <h1>Your Health, Your Security</h1>
                    <p>
                        Experience a smarter way to manage your health funds with <strong>Health Sure</strong>—where transparency meets trust.
                    </p>
                    <p>
                        Track your deposits, withdrawals, and balances effortlessly, ensuring peace of mind with every transaction.
                    </p>
                    <button className="cta-button">Get Started</button>
                </div>

                <div className="hero-image">
                    <Image src="/hero-img-2.jpg" alt="Racheal Paul" width={1000} height={1000} quality={100} />
                </div>
            </div>

            {/* Animated Cards Section */}
            <div className="hero-card-container">
                <motion.div className="hero-card" variants={cardVariantsLeft} initial="hidden" animate="visible" whileHover={{ y: -10 }}>
                    <FaWallet className="hero-card-icon" />
                    <h3>Smart Health Wallet</h3>
                    <p>Take full control of your health funds. Track your deposits, withdrawals, and balances with real-time transparency.</p>
                </motion.div>

                <motion.div className="hero-card" variants={cardVariantsRight} initial="hidden" animate="visible" whileHover={{ y: -10 }}>
                    <FaPeopleRoof className="hero-card-icon" />
                    <h3>Family-Centric Coverage</h3>
                    <p>Your loved ones deserve the best. Enjoy seamless health management for you and your family, all in one place.</p>
                </motion.div>

                <motion.div className="hero-card" variants={cardVariantsLeft} initial="hidden" animate="visible" whileHover={{ y: -10 }}>
                    <IoAirplane className="hero-card-icon" />
                    <h3>Global Health Access</h3>
                    <p>Stay covered wherever life takes you. Access your health funds anytime, anywhere—no borders, no limits.</p>
                </motion.div>

                <motion.div className="hero-card" variants={cardVariantsRight} initial="hidden" animate="visible" whileHover={{ y: -10 }}>
                    <RiMentalHealthFill className="hero-card-icon" />
                    <h3>Holistic Well-being</h3>
                    <p>Health goes beyond the physical. Keep track of both medical and mental wellness support, all in one secure platform.</p>
                </motion.div>
            </div>
        </section>
    );
}
