"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { TreatmentInfo } from "@/types/treatmentInfo";
import { CircularProgress } from "@mui/material";

export default function TreatmentInfoView() {
  const storedTreatmentInfo = useSelector((state: RootState) => state.treatmentInfo);
  const { token, userId } = useAuth();
  const [treatmentInfo, setTreatmentInfo] = useState<TreatmentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !userId) return;
    const fetchTreatmentInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const hasStored = storedTreatmentInfo && (
          storedTreatmentInfo.assignedDoctor?.name ||
          storedTreatmentInfo.treatmentPlans?.length > 0 ||
          storedTreatmentInfo.upcomingAppointments?.length > 0
        );
        if (hasStored) { setTreatmentInfo(storedTreatmentInfo); return; }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/${userId}/manage-health/treatment-info`,
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
        );
        if (response.status === 401 || response.status === 404) { setTreatmentInfo(null); return; }
        if (!response.ok) throw new Error(`Failed to fetch treatment info: ${response.status}`);
        const data = await response.json();
        setTreatmentInfo(data.data || data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchTreatmentInfo();
  }, [token, userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div className="loading-container"><CircularProgress size={28} /><p>Loading treatment info...</p></div>;
  if (error) return <div className="error-container"><p>Error: {error}</p><button onClick={() => setError(null)}>Retry</button></div>;

  const isInfoAvailable = treatmentInfo && (
    treatmentInfo.assignedDoctor?.name ||
    treatmentInfo.treatmentPlans?.length > 0 ||
    treatmentInfo.upcomingAppointments?.length > 0
  );

  return (
    <div className="treatment-info-container">
      {isInfoAvailable ? (
        <div className="treatment-info-container treatment-flex-info">
          <div className="small-treatment-flex">
            <h3>ASSIGNED DOCTOR</h3>
            <div className="info-item"><h4>Name:</h4><p>{treatmentInfo!.assignedDoctor.name ?? "—"}</p></div>
            <div className="info-item"><h4>Specialization:</h4><p>{treatmentInfo!.assignedDoctor.specialization ?? "—"}</p></div>
            <div className="info-item"><h4>Contact:</h4><p>{treatmentInfo!.assignedDoctor.contact ?? "—"}</p></div>
          </div>
          <div className="small-treatment-flex">
            <h3>TREATMENT PLANS</h3>
            <ul>{treatmentInfo!.treatmentPlans.map((plan, i) => <li key={i}>{plan}</li>)}</ul>
          </div>
          <div className="small-treatment-flex">
            <h3>UPCOMING APPOINTMENTS</h3>
            <ul>
              {treatmentInfo!.upcomingAppointments.map((appt, i) => (
                <li key={i}>
                  <div className="info-item"><h3>Date:</h3><p>{appt.date}</p></div>
                  <div className="info-item"><h3>Time:</h3><p>{appt.time}</p></div>
                  <div className="info-item"><h3>Location:</h3><p>{appt.location}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="missing-info">
          <p>No treatment information available.</p>
          <Link href={`/dashboard/${userId}/manage-health/edit-health`} className="info-link">Click here to fill in your details</Link>
        </div>
      )}
    </div>
  );
}
