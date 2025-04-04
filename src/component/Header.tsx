"use client";
import { GiHealthCapsule } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderSection() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSticky, setSticky] = useState(1);
  const [isOpen3, setIsOpen3] = useState(false);

  const handleOpen3 = () => {
    setIsOpen3((prev) => !prev);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 100;
      setSticky(Math.max(1 - scrollTop / maxScroll, 0.6));
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pathname = usePathname();

  return (
    <>
      <header className="header-section" style={{ opacity: isSticky }}>
        <div className="header-section-div">
          {/* header part 1 */}
          <div className="header-part-1">
            <GiHealthCapsule className="logo-icon" />
            <div>
              <h2>Health</h2>
              <h2 className="sure">Sure</h2>
            </div>
          </div>

          {/* header part 2 */}
          <div className="header-part-2">
            <ul>
              <li className={pathname === "/" ? "active" : ""}>
                <Link href="/">Home</Link>
              </li>
              <li className={pathname === "/about-us" ? "active" : ""}>
                <Link href="/about-us">About Us</Link>
              </li>
              <li
                className={`dropdown-container ${
                  pathname === "/products" ? "active" : ""
                }`}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                onClick={handleOpen3}
              >
                Products
                <div className="dropdown-container-2">
                  {isDropdownOpen || isOpen3 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  {isDropdownOpen && (
                    <div className="dropdown-section">
                      <p>
                        <Link href="/">Track your health savings</Link>
                      </p>
                      <p>
                        <Link href="/">View proof of deposits and withdrawals</Link>
                      </p>
                      <p>
                        <Link href="/">Secure financial tracking</Link>
                      </p>
                    </div>
                  )}
                </div>
              </li>
              <li className={pathname === "/contact-us" ? "active" : ""}>
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* header part 3 */}
          <div className="header-part-3">
            <button className="login-btn" onClick={() => window.location.href = "/auth/log-in"}>
              Log In
              </button>

            <button className="signup-btn" onClick={() => window.location.href = "/auth/sign-up"}>
              Sign Up
              </button>
          </div>
        </div>
      </header>
    </>
  );
}
