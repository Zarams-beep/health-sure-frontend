"use client";
import { useState, useEffect } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { MedicalHistory } from "@/types/medicalHistory";
import { CircularProgress } from "@mui/material";
import { setMedicalHistory } from "@/store/slices/medicalHistory";
export default function MedicalHistoryView() {
  const storedMedicalHistory = useSelector(
    (state: RootState) => state.medicalHistory
  );
  
  const { id: userId, token } = useSelector((state: RootState) => state.auth);
  
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory>({
    pastDiagnoses: [],
    surgeries: [],
    medications: [],
    familyHistory: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicalHealthInfo = async () => {
      try {
        if  (
          storedMedicalHistory &&
          (
            storedMedicalHistory.pastDiagnoses.length > 0 ||
            storedMedicalHistory.surgeries.length > 0 ||
            storedMedicalHistory.medications.length > 0 ||
            storedMedicalHistory.familyHistory.length > 0
          )
        ) {
          setMedicalHistory(storedMedicalHistory);
          setLoading(false);
          return;
        }
        const response = await fetch(
          `https://health-sure-backend.onrender.com/dashboard/${userId}/manage-health/medical-history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch medical history: ${response.status}`);
        }

        const data = await response.json();
        const backendData = data.data || data;

        if (!backendData.pastDiagnoses) {
          throw new Error("Incomplete medical health info from server.");
        }
        setMedicalHistory(backendData);}
        catch (err) {
          console.error("Error fetching medical health info:", err);
          setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
          setLoading(false);
        }
      };
      fetchMedicalHealthInfo();
    }, [userId, token]);

    const isInfoAvailable = Object.values(medicalHistory).every((value) => value);

    if (loading) {
      return (
        <div className="loading-container">
          <CircularProgress />
          <p>Loading medical health info...</p>
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
    <div className="health-status-container">
      {isInfoAvailable ? (
        <div className="health-status-container">
          <div className="info-item">
            <h4>Past Diagnoses:</h4>
            <ul>
              {medicalHistory.pastDiagnoses.map((diagnosis, index) => (
                <li key={index}>{diagnosis}</li>
              ))}
            </ul>
          </div>

          <div className="info-item">
            <h4>Surgeries:</h4>
            <ul>
              {medicalHistory.surgeries.map((surgery, index) => (
                <li key={index}>{surgery}</li>
              ))}
            </ul>
          </div>

          <div className="info-item">
            <h4>Medications:</h4>
            <ul>
              {medicalHistory.medications.map((med, index) => (
                <li key={index}>
                  {med.name} - {med.dosage}, {med.frequency}
                </li>
              ))}
            </ul>
          </div>

          <div className="info-item">
            <h4>Family History:</h4>
            <ul>
              {medicalHistory.familyHistory.map((history, index) => (
                <li key={index}>{history}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="missing-info">
          <p>You haven&apos;t added your medical history yet.</p>
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
