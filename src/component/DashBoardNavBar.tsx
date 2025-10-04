"use client";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { IoMdNotifications, IoMdNotificationsOff } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { IoIosLogOut, IoIosSearch } from "react-icons/io";
import { setUserData } from "@/store/slices/authSlices"; // your Redux action
import { useRouter } from "next/navigation";

export default function DashboardNavBarPage() {
  const [notificationClick, setNotification] = useState(false);
  const { fullName, image, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const displayName = fullName || "Guest";
  const profileImage = image 
    ? `https://health-sure-backend.onrender.com${image}` 
    : "/img-5.jpg";

  const handleNotificationClick = () => {
    setNotification((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      // Call backend to blacklist token
      if (token) {
        const response = await fetch("https://health-sure-backend.onrender.com/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error("Logout failed");
        }
      }

      // Clear Redux state
      dispatch(setUserData({ fullName: "", email: "", image: "", token: "", id: "" }));

      // Optionally clear localStorage
      localStorage.removeItem("token");

      // Redirect to login page
      router.push("/auth/log-in");

    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-nav-bar">
        {/* Search Input with Icon */}
        <div className="search-container">
          <IoIosSearch className="search-icon" />
          <input
            type="search"
            name="search"
            placeholder="Search something..."
            className="search-input"
          />
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-small">
            <div className="img-container">
              <Image
                src={profileImage}
                alt="Profile image"
                width={470}
                height={470}
                quality={100}
                className="profile-image"
                onError={(e) => { e.currentTarget.src = '/img-5.jpg'; }}
              />
            </div>
            <h4 className="profile-name">{displayName}</h4>
            <p className="profile-role">Member</p>
          </div>

          {/* Icons Section */}
          <div className="icon-section">
            <button className="icon-btn" onClick={handleNotificationClick}>
              {notificationClick ? <IoMdNotifications /> : <IoMdNotificationsOff />}
            </button>
            <button className="icon-btn">
              <IoSettings />
            </button>
            <button className="icon-btn" onClick={handleLogout}>
              <IoIosLogOut />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
