"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { IoMdNotifications, IoMdNotificationsOff } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { IoIosLogOut, IoIosSearch} from "react-icons/io";

export default function DashboardNavBarPage() {
  const [notificationClick, setNotification] = useState(false);
  const { fullName, image } = useSelector((state: RootState) => state.auth);

  const displayName = fullName || "Guest";
  const profileImage = image 
  ? `http://localhost:5000${image}` 
  : "/img-5.jpg";

  const handleNotificationClick = () => {
    setNotification((prev) => !prev);
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
                onError={(e) => {
                  e.currentTarget.src = '/img-5.jpg';
                }}
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
          <button className="icon-btn">
            <IoIosLogOut />
          </button>
        </div>
        </div>
        </div>
    </header>
  );
}
