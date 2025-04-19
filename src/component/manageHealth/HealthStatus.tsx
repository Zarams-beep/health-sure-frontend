"use client";
import { useState, useEffect } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { HealthStatus } from "@/types/healthSure";
import { CircularProgress } from "@mui/material";

export default function HealthStatusView() {
  const storedHealthStatus = useSelector((state: RootState) => state.healthStatus);
  const { id: userId, token } = useSelector((state: RootState) => state.auth);

  const [healthStatus, setHealthStatus] = useState<HealthStatus>({
    healthCondition: "",
    vitalSigns: {
      bloodPressure: 0,
      heartRate: 0,
      temperature: 0,
      sugar: 0,
      oxygen: 0,
      cholesterol: 0,
      BMI: 0,
    },
    allergies: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealthStatus = async () => {
      try {
        if (storedHealthStatus?.vitalSigns) {
          setHealthStatus(storedHealthStatus);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://health-sure-backend.onrender.com/dashboard/${userId}/manage-health/health-status`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch health info: ${response.status}`);
        }

        const data = await response.json();
        const backendData = data.data || data;

        if (!backendData) {
          throw new Error("Incomplete health info from server.");
        }

        setHealthStatus({
          healthCondition: backendData.healthCondition ?? "",
          vitalSigns: {
            bloodPressure: backendData.vitalSigns?.bloodPressure ?? 0,
            heartRate: backendData.vitalSigns?.heartRate ?? 0,
            temperature: backendData.vitalSigns?.temperature ?? 0,
            sugar: backendData.vitalSigns?.sugar ?? 0,
            oxygen: backendData.vitalSigns?.oxygen ?? 0,
            cholesterol: backendData.vitalSigns?.cholesterol ?? 0,
            BMI: backendData.vitalSigns?.BMI ?? 0,
          },
          allergies: backendData.allergies ?? [],
        });
      } catch (err) {
        console.error("Error fetching health info:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchHealthStatus();
  }, [userId, token]);

  const isInfoAvailable =
    !!healthStatus.healthCondition && !!healthStatus.vitalSigns;

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
    <div className="health-status-container">
      {isInfoAvailable ? (
        <>
          <div className="info-item">
            <h4>Health Condition:</h4>
            <p>{healthStatus.healthCondition}</p>
          </div>

          {healthStatus.vitalSigns && (
            <>
              <div className="info-item">
                <h4>Blood Pressure:</h4>
                <p>{healthStatus.vitalSigns.bloodPressure ?? "N/A"}</p>
              </div>
              <div className="info-item">
                <h4>Heart Rate:</h4>
                <p>{healthStatus.vitalSigns.heartRate ?? "N/A"}</p>
              </div>
              <div className="info-item">
                <h4>Temperature:</h4>
                <p>{healthStatus.vitalSigns.temperature ?? "N/A"}</p>
              </div>
            </>
          )}

          <div className="info-item">
            <h4>Allergies:</h4>
            <p>
              {healthStatus.allergies.length > 0
                ? healthStatus.allergies.join(", ")
                : "None"}
            </p>
          </div>
        </>
      ) : (
        <div className="missing-info">
          <p>You haven&apos;t added your health information yet.</p>
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
