"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { MedicalHistory } from "@/types/medicalHistory";
import { CircularProgress } from "@mui/material";

export default function MedicalHistoryView() {
  const storedMedicalHistory = useSelector((state: RootState) => state.medicalHistory);
  const { token, userId } = useAuth();
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !userId) return;
    const fetchMedicalHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const hasStored = storedMedicalHistory && (
          storedMedicalHistory.pastDiagnoses?.length > 0 ||
          storedMedicalHistory.surgeries?.length > 0 ||
          storedMedicalHistory.medications?.length > 0 ||
          storedMedicalHistory.familyHistory?.length > 0
        );
        if (hasStored) { setMedicalHistory(storedMedicalHistory); return; }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/${userId}/manage-health/medical-history`,
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
        );
        if (response.status === 401 || response.status === 404) { setMedicalHistory(null); return; }
        if (!response.ok) throw new Error(`Failed to fetch medical history: ${response.status}`);
        const data = await response.json();
        setMedicalHistory(data.data || data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchMedicalHistory();
  }, [token, userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div className="loading-container"><CircularProgress size={28} /><p>Loading medical history...</p></div>;
  if (error) return <div className="error-container"><p>Error: {error}</p><button onClick={() => setError(null)}>Retry</button></div>;

  const isInfoAvailable = medicalHistory && (
    medicalHistory.pastDiagnoses?.length > 0 || medicalHistory.surgeries?.length > 0 ||
    medicalHistory.medications?.length > 0 || medicalHistory.familyHistory?.length > 0
  );

  return (
    <div className="health-status-container">
      {isInfoAvailable ? (
        <div className="health-status-container">
          <div className="info-item"><h4>Past Diagnoses:</h4><ul>{medicalHistory!.pastDiagnoses.map((d, i) => <li key={i}>{d}</li>)}</ul></div>
          <div className="info-item"><h4>Surgeries:</h4><ul>{medicalHistory!.surgeries.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
          <div className="info-item"><h4>Medications:</h4><ul>{medicalHistory!.medications.map((m, i) => <li key={i}>{m.name} - {m.dosage}, {m.frequency}</li>)}</ul></div>
          <div className="info-item"><h4>Family History:</h4><ul>{medicalHistory!.familyHistory.map((h, i) => <li key={i}>{h}</li>)}</ul></div>
        </div>
      ) : (
        <div className="missing-info">
          <p>You haven&apos;t added your medical history yet.</p>
          <Link href={`/dashboard/${userId}/manage-health/edit-health`} className="info-link">Click here to fill in your details</Link>
        </div>
      )}
    </div>
  );
}
