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
    
    const fetchTreatmentInfo = async () => {
      try {
        if (
          storedTreatmentInfo &&
          (
            storedTreatmentInfo.assignedDoctor?.name ||
            storedTreatmentInfo.assignedDoctor?.specialization ||
            storedTreatmentInfo.assignedDoctor?.contact ||
            storedTreatmentInfo.treatmentPlans.length > 0 ||
            storedTreatmentInfo.upcomingAppointments.length > 0
          )
        ) {
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
            throw new Error(`Failed to fetch treatment info: ${response.status}`);
          }
  
          const data = await response.json();
          const backendData = data.data || data;
          console.log("Backend data:", backendData);
  
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

    if (loading) {
      return (
        <div className="loading-container">
          <CircularProgress />
          <p>Loading health info...</p>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="error-container">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      );
    }

  return (
    <div className="treatment-info-container">
      {isInfoAvailable ? (
        <div className="treatment-info-container treatment-flex-info">
          <div className="small-treatment-flex">
          <h3>ASSIGNED DOCTOR</h3>
          <div className="info-item">
            <h4>Name:</h4>
          <p>{treatmentInfo.assignedDoctor.name}</p>
          </div>
          <div className="info-item">
            <h4>Specialization:</h4>
          <p>{treatmentInfo.assignedDoctor.specialization}</p>
          </div>
        <div className="info-item">
          <h4>Contact:</h4>
        <p>{treatmentInfo.assignedDoctor.contact}</p>
        </div>
          </div>

          <div className="small-treatment-flex">
          <h3>TREATMENT PLANS</h3>
          <ul>
            {treatmentInfo.treatmentPlans.map((plan, index) => (
              <li key={index}>{plan}</li>
            ))}
          </ul></div>


 <div className="small-treatment-flex">
          <h3>UPCOMING APPOINTMENTS</h3>
          <ul>
            {treatmentInfo.upcomingAppointments.map((appointment, index) => (
              <li key={index}>
                <div className="info-item">
                  <h3>Date:</h3>
                <p>{appointment.date}</p>
                </div>
<div className="info-item">
  <h3>Time:</h3>
<p>{appointment.time}</p>
</div>
               <div className="info-item">
                <h3>Location:</h3>
                <p>{appointment.location}</p>
               </div>
              </li>
            ))}
          </ul></div>
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
    </div>
  );
}
