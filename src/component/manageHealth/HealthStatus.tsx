"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { HealthStatus } from "@/types/healthSure";
import { CircularProgress } from "@mui/material";

export default function HealthStatusView() {
  const storedHealthStatus = useSelector((state: RootState) => state.healthStatus);
  const { token, userId } = useAuth();

  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !userId) return;

    const fetchHealthStatus = async () => {
      setLoading(true);
      setError(null);
      try {
        if (storedHealthStatus?.healthCondition) {
          setHealthStatus(storedHealthStatus);
          return;
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/${userId}/manage-health/health-status`,
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
        );
        if (response.status === 401 || response.status === 404) {
          setHealthStatus(null);
          return;
        }
        if (!response.ok) throw new Error(`Failed to fetch health info: ${response.status}`);
        const data = await response.json();
        setHealthStatus(data.data || data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchHealthStatus();
  }, [token, userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return (
    <div className="loading-container">
      <CircularProgress size={28} />
      <p>Loading health info...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <p>Error: {error}</p>
      <button onClick={() => setError(null)}>Retry</button>
    </div>
  );

  const isInfoAvailable =
    healthStatus &&
    (healthStatus.healthCondition !== "" ||
      healthStatus.allergies?.length > 0 ||
      Object.values(healthStatus.vitalSigns || {}).some((v) => Number(v) !== 0));

  return (
    <div className="health-status-container">
      {isInfoAvailable ? (
        <div className="basic-info-container">
          <div className="info-item"><h4>Health Condition:</h4><p>{healthStatus!.healthCondition}</p></div>
          {healthStatus!.vitalSigns && (
            <>
              <div className="info-item"><h4>Blood Pressure:</h4><p>{healthStatus!.vitalSigns.bloodPressure}</p></div>
              <div className="info-item"><h4>Heart Rate:</h4><p>{healthStatus!.vitalSigns.heartRate}</p></div>
              <div className="info-item"><h4>Temperature:</h4><p>{healthStatus!.vitalSigns.temperature}</p></div>
              <div className="info-item"><h4>Sugar:</h4><p>{healthStatus!.vitalSigns.sugar}</p></div>
              <div className="info-item"><h4>Oxygen:</h4><p>{healthStatus!.vitalSigns.oxygen}</p></div>
              <div className="info-item"><h4>Cholesterol:</h4><p>{healthStatus!.vitalSigns.cholesterol}</p></div>
              <div className="info-item"><h4>BMI:</h4><p>{healthStatus!.vitalSigns.BMI}</p></div>
            </>
          )}
          <div className="info-item">
            <h4>Allergies:</h4>
            <p>{healthStatus!.allergies?.length > 0 ? healthStatus!.allergies.join(", ") : "None"}</p>
          </div>
        </div>
      ) : (
        <div className="missing-info">
          <p>You haven&apos;t added your health information yet.</p>
          <Link href={`/dashboard/${userId}/manage-health/edit-health`} className="info-link">
            Click here to fill in your details
          </Link>
        </div>
      )}
    </div>
  );
}
