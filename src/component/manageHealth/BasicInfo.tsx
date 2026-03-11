"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { BasicInfo } from "@/types/basicInfo";
import { CircularProgress } from "@mui/material";

export default function BasicInfoSectionView() {
  const storedBasicInfo = useSelector((state: RootState) => state.basicInfo);
  const { token, userId } = useAuth();

  const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !userId) return;

    const fetchBasicInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        if (storedBasicInfo?.fullName) {
          setBasicInfo(storedBasicInfo);
          return;
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/${userId}/manage-health/basic-info`,
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
        );
        // 401 or 404 = no data yet, not a real error
        if (response.status === 401 || response.status === 404) {
          setBasicInfo(null);
          return;
        }
        if (!response.ok) throw new Error(`Failed to fetch basic info: ${response.status}`);
        const data = await response.json();
        setBasicInfo(data.data || data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBasicInfo();
  }, [token, userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return (
    <div className="loading-container">
      <CircularProgress size={28} />
      <p>Loading basic info...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <p>Error: {error}</p>
      <button onClick={() => setError(null)}>Retry</button>
    </div>
  );

  const hasData = basicInfo && Object.values(basicInfo).some((v) => v !== "" && v !== null);

  return (
    <div className="basic-info-container">
      {hasData ? (
        <>
          {Object.entries(basicInfo!)
            .filter(([key]) => !["id", "userId", "createdAt", "updatedAt"].includes(key))
            .map(([key, value]) => (
              <div className="info-item" key={key}>
                <h4>{key.replace(/([A-Z])/g, " $1")}:</h4>
                <p>{value ?? "—"}</p>
              </div>
            ))}
        </>
      ) : (
        <div className="missing-info">
          <p>You haven&apos;t added your basic information yet.</p>
          <Link href={`/dashboard/${userId}/manage-health/edit-health`} className="info-link">
            Click here to fill in your details
          </Link>
        </div>
      )}
    </div>
  );
}
