"use client";
import { GiHealthCapsule } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useState, useEffect, useRef } from "react";
// import { useMediaQuery } from "react-responsive";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function MediaHeaderSection() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
//   const [isOpen3, setIsOpen3] = useState(false);
  const [isSticky, setSticky] = useState(1);
  const menuRef = useRef<HTMLDivElement>(null);

 const [isMobile, setIsMobile] = useState(false);
   
     useEffect(() => {
         const checkScreenSize = () => {
           setIsMobile(window.innerWidth < 920);
         };
   
         checkScreenSize(); // Run once
         window.addEventListener("resize", checkScreenSize);
   
         return () => window.removeEventListener("resize", checkScreenSize);
     }, []);

  const handleOpen2 = () => {
    setIsOpen2((prev) => !prev);
    setIsOpen(false)
  };
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
    setIsOpen2(false)
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 100;
      setSticky(Math.max(1 - scrollTop / maxScroll, 0.6));
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
  const pathname = usePathname();
  return (
    <header className="header-section" style={{ opacity: isSticky }}>
      <div className="header-section-div">
        {/* Header Left */}
        <div className="header-part-1">
          <GiHealthCapsule className="logo-icon" />
          <div>
            <h2>Health</h2>
            <h2 className="sure">Sure</h2>
          </div>
        </div>

        <div className={isMobile ? "media-header-part-2" : "header-part-2"}>
          {/* Mobile Menu Toggle */}
          <div className="menu-container">
            {isMobile && (
              <div className="menu-icon" onClick={handleOpen}>
                {isOpen ? (
                  <RxCross1 size={30} className="media-icon" />
                ) : (
                  <RxHamburgerMenu size={30} className="media-icon" />
                )}
              </div>
            )}

            {/* Navigation Menu */}
            <div
              ref={menuRef}
              className={`menu-part-1 ${isOpen ? "open" : "closed"}`}
            >
              <ul>
                <li className={pathname === "/" ? "active" : ""}>
                  <Link href="/">Home</Link>
                </li>
                <li className={pathname === "/about-us" ? "active" : ""}>
                  <Link href="/about-us">About Us</Link>
                </li>
                <li
                  className="dropdown-container"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                //   onClick={handleOpen3}
                >
                  Products
                  <div className="dropdown-container-2">
                    {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    {isDropdownOpen && (
                      <div className="dropdown-section">
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
                      </div>
                    )}
                  </div>
                </li>
                <li className={pathname === "/contact-us" ? "active" : ""}>
                  <Link href="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Header Right - Auth Buttons */}
          <div className="header-auth-btn-container">
            <CgProfile size={40} onClick={handleOpen2} className="profile-icon"/>

            {isOpen2 && (
  <div className="mini-header-part-3">
    <button
      className="login-btn"
      onClick={() => window.location.href = "/auth/log-in"}
    >
      Log In
    </button>
    <button
      className="signup-btn"
      onClick={() => window.location.href = "/auth/sign-up"}
    >
      Sign Up
    </button>
  </div>
)}

          </div>
        </div>
      </div>
    </header>
  );
}
