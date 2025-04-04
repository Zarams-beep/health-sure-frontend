"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import Image from "next/image";

export default function DashboardLatestAppPage() {
  const LatestAppoint = [
    {
      name: "Dr. Amanda Lee",
      role: "Radiologist",
      date: "Mar 1, 2025",
      image: "/female1.jpg",
    },
    {
      name: "John Thompson",
      role: "Oncologist",
      date: "May 14, 2025",
      image: "/male1.jpg",
    },
    {
      name: "Sarah Ahmed",
      role: "Obstetrician",
      date: "Jan 30, 2025",
      image: "/female2.jpg",
    },
    {
      name: "Michael O'Connor",
      role: "Neurologist",
      date: "April 28, 2025",
      image: "/male2.jpg",
    },
    {
      name: "Emily Chen",
      role: "Cardiologist",
      date: "Sep 15, 2025",
      image: "/female1.jpg",
    },
  ];

  // State to control the number of displayed items
  const [showAll, setShowAll] = useState(false);

  // Display only first 4 when collapsed
  const visibleAppointments = showAll ? LatestAppoint : LatestAppoint.slice(0, 4);

  return (
    <div className="semi-appointment-container">
      <header>
        <h3>Latest Appointments</h3>
        <button className="add-button">
          <FaPlus />
        </button>
      </header>

      {/* Appointment List */}
      <ul className="appointment-list">
        {visibleAppointments.map((member, index) => (
          <li key={index} className="appointment-item">
            <div className="appointment-details">
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={250}
                quality={100}
                className="latest-img"
              />

              <div className="appointment-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <p>{member.date}</p>
              </div>
            </div>

            <div className="message-icon">
              <AiFillMessage />
            </div>
          </li>
        ))}
      </ul>

      {/* Show More / Show Less Button */}
      <div className="btn-show">
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Less.." : "More.."}
        </button>
      </div>

      <div className="btn-container">
        <button>More Info</button>
      </div>
    </div>
  );
}
