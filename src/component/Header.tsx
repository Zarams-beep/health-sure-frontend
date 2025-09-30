"use client";
import { GiHealthCapsule } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function HeaderSection() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSticky, setSticky] = useState(1);
  const [isOpen3, setIsOpen3] = useState(false);

  const handleOpen3 = () => setIsOpen3((prev) => !prev);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 100;
      setSticky(Math.max(1 - scrollTop / maxScroll, 0.6));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="header-section"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: isSticky }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ opacity: isSticky }}
    >
      <div className="container">
        <div className="header-section-div">
          {/* Logo */}
          <motion.div
            className="header-part-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GiHealthCapsule className="logo-icon" />
            <div>
              <h2>Health</h2>
              <h2 className="sure">Sure</h2>
            </div>
          </motion.div>

          {/* Nav Links */}
          <motion.div
            className="header-part-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ul>
              <li className={pathname === "/" ? "active" : ""}>
                <Link href="/">Home</Link>
              </li>
              <li className={pathname === "/about-us" ? "active" : ""}>
                <Link href="/about-us">About Us</Link>
              </li>

              {/* Products Dropdown */}
              <li
                className={`dropdown-container ${
                  pathname.startsWith("/products") ? "active" : ""
                }`}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                onClick={handleOpen3}
              >
                Products
                <div className="dropdown-container-2">
                  {isDropdownOpen || isOpen3 ? <IoIosArrowUp /> : <IoIosArrowDown />}

                  <AnimatePresence>
                    {(isDropdownOpen || isOpen3) && (
                      <motion.div
                        className="dropdown-section"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p>
                          <Link href="/">Track your health savings</Link>
                        </p>
                        <p>
                          <Link href="/">View proof of deposits and withdrawals</Link>
                        </p>
                        <p>
                          <Link href="/">Secure financial tracking</Link>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>

              <li className={pathname === "/contact-us" ? "active" : ""}>
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="header-part-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button className="login-btn" onClick={() => router.push("/auth/log-in")}>
              Log In
            </button>
            <button className="signup-btn" onClick={() => router.push("/auth/sign-up")}>
              Sign Up
            </button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
