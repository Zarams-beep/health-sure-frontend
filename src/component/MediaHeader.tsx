"use client";
import { GiHealthCapsule } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function MediaHeaderSection() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isSticky, setSticky] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Responsive check
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 920);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Sticky opacity + outside click
  useEffect(() => {
    const handleScroll = () =>
      setSticky(Math.max(1 - window.scrollY / 100, 0.6));

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.header
      className="header-section"
      style={{ opacity: isSticky }}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="header-section-div">
          {/* Left logo */}
          <motion.div
            className="header-part-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GiHealthCapsule className="logo-icon" />
            <div>
              <h2>Health</h2>
              <h2 className="sure">Sure</h2>
            </div>
          </motion.div>

          <div className={isMobile ? "media-header-part-2" : "header-part-2"}>
            {/* Mobile toggle */}
            {isMobile && (
              <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <RxCross1 size={30} className="media-icon" />
                ) : (
                  <RxHamburgerMenu size={30} className="media-icon" />
                )}
              </div>
            )}

            {/* Navigation menu */}
            <AnimatePresence>
              {(isOpen || !isMobile) && (
                <motion.div
                  ref={menuRef}
                  className={`menu-part-1 ${isMobile ? "" : "desktop-menu"}`}
                  initial={{ x: isMobile ? "100%" : 0, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: isMobile ? "100%" : 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <ul>
                    <li className={pathname === "/" ? "active" : ""}>
                      <Link href="/">Home</Link>
                    </li>
                    <li className={pathname === "/about-us" ? "active" : ""}>
                      <Link href="/about-us">About Us</Link>
                    </li>

                    {/* Dropdown */}
                    <li
                      className="dropdown-container"
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      Products
                      <div className="dropdown-container-2">
                        {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              className="dropdown-section"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <p>
                                <Link href="/">Track your health savings</Link>
                              </p>
                              <p>
                                <Link href="/">
                                  View proof of deposits and withdrawals
                                </Link>
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
              )}
            </AnimatePresence>

            {/* Profile / auth buttons */}
            <div className="header-auth-btn-container">
              <CgProfile
                size={40}
                onClick={() => setIsOpen2((prev) => !prev)}
                className="profile-icon"
              />

              <AnimatePresence>
                {isOpen2 && (
                  <motion.div
                    className="mini-header-part-3"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      className="login-btn"
                      onClick={() => (window.location.href = "/auth/log-in")}
                    >
                      Log In
                    </button>
                    <button
                      className="signup-btn"
                      onClick={() => (window.location.href = "/auth/sign-up")}
                    >
                      Sign Up
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
