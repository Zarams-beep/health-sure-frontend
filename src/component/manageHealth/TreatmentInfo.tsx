"use client";
import { useState, useEffect } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { TreatmentInfo } from "@/types/treatmentInfo";
import { CircularProgress } from "@mui/material";

export default function TreatmentInfoView() {
  const storedTreatmentInfo = useSelector(
    (state: RootState) => state.treatmentInfo
  );
  const { id: userId, token } = useSelector((state: RootState) => state.auth);

  const [treatmentInfo, setTreatmentInfo] = useState<TreatmentInfo>({
    assignedDoctor: {
      name: null,
      specialization: null,
      contact: null,
    },
    treatmentPlans: [],
    upcomingAppointments: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(userId);
    
    const fetchTreatmentInfo = async () => {
      try {
        if (storedTreatmentInfo){
            setTreatmentInfo(storedTreatmentInfo);
            setLoading(false);
            return;
        }
        const response = await fetch(
            `https://health-sure-backend.onrender.com/dashboard/${userId}/manage-health/treatment-info`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
  
          if (!response.ok) {
            throw new Error(`Failed to fetch basic info: ${response.status}`);
          }
  
          const data = await response.json();
          const backendData = data.data || data;
  
          if (!backendData) {
            throw new Error("Incomplete treatment info from server.");
          }
          setTreatmentInfo(backendData);
      } catch (err) {
        console.error("Error fetching treatment info:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchTreatmentInfo();},
    [userId,token]);
    
    const isInfoAvailable = Object.values(treatmentInfo).every((value) => value);

  return (
    <>
      {isInfoAvailable ? (
        <div>
          <h2>Assigned Doctor</h2>
          <p>Name: {treatmentInfo.assignedDoctor.name}</p>
          <p>Specialization: {treatmentInfo.assignedDoctor.specialization}</p>
          <p>Contact: {treatmentInfo.assignedDoctor.contact}</p>

          <h2>Treatment Plans</h2>
          <ul>
            {treatmentInfo.treatmentPlans.map((plan, index) => (
              <li key={index}>{plan}</li>
            ))}
          </ul>

          <h2>Upcoming Appointments</h2>
          <ul>
            {treatmentInfo.upcomingAppointments.map((appointment, index) => (
              <li key={index}>
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
                <p>Location: {appointment.location}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="missing-info">
          <p>No treatment information available.</p>
          <Link
            href={`/dashboard/${userId}/manage-health/edit-health`}
            className="info-link"
          >
            Click here to fill in your details
          </Link>
        </div>
      )}
    </>
  );
}
