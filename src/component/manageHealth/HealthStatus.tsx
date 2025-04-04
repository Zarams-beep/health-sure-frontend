"use client";
import { useState, useEffect } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { HealthStatus } from "@/types/healthSure";

export default function HealthStatusView() {
  const storedHealthStatus = useSelector((state: RootState) => state.healthStatus);
 const fullName =
    useSelector((state: RootState) => state.auth.fullName) || "Chizaram";
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

  useEffect(() => {
    if (storedHealthStatus) {
        setHealthStatus({
        healthCondition: storedHealthStatus.healthCondition || "",
        vitalSigns: {
          bloodPressure: storedHealthStatus.vitalSigns.bloodPressure || 0,
          heartRate: storedHealthStatus.vitalSigns.heartRate ?? null,
          temperature: storedHealthStatus.vitalSigns.temperature ?? null,
          sugar: storedHealthStatus.vitalSigns.sugar ?? null,
          oxygen: storedHealthStatus.vitalSigns.oxygen ?? null,
          cholesterol: storedHealthStatus.vitalSigns.cholesterol ?? null,
          BMI: storedHealthStatus.vitalSigns.BMI ?? null,
        },
        allergies: storedHealthStatus.allergies || [],
      });
    }
  }, [storedHealthStatus]);

  // Check if any required field is missing
  const isInfoAvailable = Object.values(healthStatus).every((value) => value);

  return (
    <div className="health-status-container">
      {isInfoAvailable ? (
        <>
          <div className="info-item">
            <h4>Health Condition:</h4>
            <p>{healthStatus.healthCondition}</p>
          </div>
          <div className="info-item">
            <h4>Blood Pressure:</h4>
            <p>{healthStatus.vitalSigns.bloodPressure}</p>
          </div>
          <div className="info-item">
            <h4>Heart Rate:</h4>
            <p>{healthStatus.vitalSigns.heartRate ?? "N/A"}</p>
          </div>
          <div className="info-item">
            <h4>Temperature:</h4>
            <p>{healthStatus.vitalSigns.temperature ?? "N/A"}</p>
          </div>
          <div className="info-item">
            <h4>Allergies:</h4>
            <p>{healthStatus.allergies.length > 0 ? healthStatus.allergies.join(", ") : "None"}</p>
          </div>
        </>
      ) : (
        <div className="missing-info">
          <p>You haven&apos;t added your health information yet.</p>
          <Link
            href={`/dashboard/${fullName}/manage-health/edit-health`}
            className="info-link"
          >
            Click here to fill in your details
          </Link>
        </div>
      )}
    </div>
  );
}
