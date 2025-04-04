"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect} from "react";
// import { useMediaQuery } from "react-responsive";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GrTransaction, GrView, GrFormEdit } from "react-icons/gr";
import { MdOutlinePayment, MdOutlineHealthAndSafety } from "react-icons/md";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { FaUserDoctor, FaHospitalUser } from "react-icons/fa6";
import { CiHospital1 } from "react-icons/ci";
import { IoIosChatbubbles } from "react-icons/io";
import { GiHealthCapsule } from "react-icons/gi";
import styles from "@/styles/SideBar.module.css";
import { IoMdNotifications, IoMdNotificationsOff } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
const MobileSidebar = () => {
  const pathname = usePathname();
  const [isHealthOpen, setIsHealthOpen] = useState<boolean>(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState<boolean>(false);
  const [notificationClick, setNotificationClick] = useState<boolean>(false);

  const handleNotificationClick = () => {
    setNotificationClick((prev) => !prev);
  };

  const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
        const checkScreenSize = () => {
          setIsMobile(window.innerWidth < 768);
        };
  
        checkScreenSize(); // Run once
        window.addEventListener("resize", checkScreenSize);
  
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

      const storedFullName = useSelector((state: RootState) => state.auth.fullName);
      
      // Ensure fullName is only used on the client
      const [fullName, setFullName] = useState("Chizaram");
    
      useEffect(() => {
        if (storedFullName) {
          setFullName(storedFullName);
        }
      }, [storedFullName]);
    
      const menuItems = [
        { name: "Landing Page", path: `/dashboard/${fullName}/landing-page`, icon: <RiDashboardHorizontalFill /> },
        { name: "Payment", path: `/dashboard/${fullName}/payment`, icon: <MdOutlinePayment /> },
        { name: "Transaction", path: `/dashboard/${fullName}/transaction-history`, icon: <GrTransaction /> },
        {
          name: "Manage Health",
          icon: <MdOutlineHealthAndSafety />,
          subItems: [
            { name: "View Health", path: `/dashboard/${fullName}/manage-health/view-health`, icon: <GrView /> },
            { name: "Edit Health", path: `/dashboard/${fullName}/manage-health/edit-health`, icon: <GrFormEdit /> },
          ],
          isOpen: isHealthOpen,
          toggle: () => setIsHealthOpen(!isHealthOpen),
        },
        {
          name: "Book Appointment",
          icon: <BsBookmarkHeartFill />,
          subItems: [
            { name: "Meet Doctor", path: `/dashboard/${fullName}/landing-page/book-appointment/meet-doctor`, icon: <FaUserDoctor /> },
            { name: "Visit Hospital", path: `/dashboard/${fullName}/landing-page/book-appointment/visit-hospital`, icon: <CiHospital1 /> },
            { name: "Appointment History", path: `/dashboard/${fullName}/landing-page/book-appointment/appointment-history`, icon: <FaHospitalUser /> },
          ],
          isOpen: isAppointmentOpen,
          toggle: () => setIsAppointmentOpen(!isAppointmentOpen),
        },
        { name: "Messages", path: `/dashboard/${fullName}/landing-page/messages`, icon: <IoIosChatbubbles /> },
      ];

  return (
    <aside className={`${styles.sidebar} sidebar`}>
      <div className={styles.sidebar2}>
        <h2><GiHealthCapsule /></h2>

        <nav>
          <ul className="side-menu-list">
            {menuItems.map((item, index) =>
              item.subItems ? (
                <li key={index}>
                  {/* Main Menu Item - Click to Toggle Dropdown */}
                  <div className="side-menu-tab" onClick={item.toggle}>
                    <div className="side-menu-title">{item.icon}</div>
                  </div>

                  {/* Dropdown Content (No Arrow) */}
                  {item.isOpen && (
                    <ul className="dropdown-menu">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link href={subItem.path}>
                            <div className={`side-menu-tab ${pathname === subItem.path ? "active-tab" : ""}`}>
                              <div className="side-menu-title">{subItem.icon}</div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={index}>
                  <Link href={item.path}>
                    <div className={`side-menu-tab ${pathname === item.path ? "active-tab" : ""}`}>
                      <div className="side-menu-title">{item.icon}</div>
                    </div>
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Conditionally Render Icons Only on Mobile */}
        {isMobile && (
          <div className="media-side-bar-icons">
            <button className="icon-btn" onClick={handleNotificationClick}>
              {notificationClick ? <IoMdNotifications /> : <IoMdNotificationsOff />}
            </button>
            <button className="icon-btn">
              <IoSettings />
            </button>
            <button className="icon-btn">
              <IoIosLogOut />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default MobileSidebar;
