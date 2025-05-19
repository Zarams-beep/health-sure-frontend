"use client";
import { useState, useEffect } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { BasicInfo } from "@/types/basicInfo";
import { CircularProgress } from "@mui/material";

export default function BasicInfoSectionView() {
  const storedBasicInfo = useSelector((state: RootState) => state.basicInfo);
  const { id: userId, token } = useSelector((state: RootState) => state.auth);

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    fullName: "",
    DOB: "",
    Age: "",
    Gender: "Male",
    phoneNumber: "",
    email: "",
    HouseAddress: "",
    EmergencyNumber: "",
    NextOfKinName: "",
    NextOfKinGender: "Male",
    NextOfKinPhoneNumber: "",
    NextOfKinEmailAddress: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBasicInfo = async () => {
      
      try {
        // Use Redux first
        if (storedBasicInfo && storedBasicInfo.fullName) {
          setBasicInfo(storedBasicInfo);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://health-sure-backend.onrender.com/dashboard/${userId}/manage-health/basic-info`,
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

        if (!backendData.fullName) {
          throw new Error("Incomplete basic info from server.");
        }

        setBasicInfo(backendData);
      } catch (err) {
        console.error("Error fetching basic info:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBasicInfo();
  }, [userId, token]);

  const isInfoAvailable = Object.values(basicInfo).every((value) => value);

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
        <p>Loading basic info...</p>
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
    <div className="basic-info-container">
      {isInfoAvailable ? (
        <div className="basic-info-container">
          {Object.entries(basicInfo)
  .filter(
    ([key]) =>
      key !== "id" &&
      key !== "userId" &&
      key !== "createdAt" &&
      key !== "updatedAt"
  )
  .map(([key, value]) => (
    <div className="info-item" key={key}>
      <h4>{key.replace(/([A-Z])/g, " $1")}:</h4>
      <p>{value}</p>
    </div>
))}

        </div>
      ) : (
        <div className="missing-info">
          <p>You haven&apos;t added your basic information yet.</p>
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
